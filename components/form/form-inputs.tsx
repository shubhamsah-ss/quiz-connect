"use client"
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { FormImageProps, FormInputProps, FormSelectProps } from "@/types/form"
import { IconEye, IconEyeClosed } from "@tabler/icons-react"
import { Camera } from "lucide-react"
import Image from "next/image"
import { ChangeEvent, MouseEvent, useEffect, useRef, useState } from 'react'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"



const FormInput = ({ form, disabled, name, label, type, inputRest, rest }: FormInputProps) => {
    const [isVisible, setVisible] = useState(false)

    const visibleHandle = () => {
        setVisible(prev => !prev)
    }

    return (
        <FormField
            disabled={disabled}
            control={form.control}
            name={name}
            render={({ field }) => (
                <FormItem>
                    <FormLabel htmlFor={name}>
                        <Label>{label}</Label>
                    </FormLabel>
                    <div className='relative'>
                        <FormControl>
                            <Input id={name} type={type === "password" ? (isVisible ? "text" : "password") : type || "text"}
                                {...field}  
                                {...inputRest}
                            />
                        </FormControl>
                        {rest}
                        {
                            type === "password" && <div className="absolute right-3 bottom-2 hover:cursor-pointer" onClick={visibleHandle}>
                                {
                                    isVisible ? <IconEye /> : <IconEyeClosed />
                                }
                            </div>
                        }

                    </div>
                    <FormMessage />
                </FormItem>
            )}
        />
    )
}



const FormSelect = ({ form, name, label, placeholder, selectItems }: FormSelectProps) => {
    return (
        <FormField
            control={form.control}
            name={name}
            render={({ field }) => (
                <FormItem>
                    <FormLabel>{label}</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                            <SelectTrigger>
                                <SelectValue placeholder={placeholder} />
                            </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                            <SelectGroup>
                                {selectItems.map((item) => (
                                    <SelectItem key={item.name} value={item.id}>
                                        {item.name}
                                    </SelectItem>
                                ))}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                    <FormMessage />
                </FormItem>
            )}
        />
    )
}


const FormImage = ({ src, alt, disabled, form }: FormImageProps) => {
    const [image, setImage] = useState<string>("")

    useEffect(() => {
        if (src) setImage(src)
    }, [src])

    const imageRef = useRef<HTMLInputElement>(null);

    const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        const reader = new FileReader()

        reader.onloadend = () => {
            setImage(reader.result as string)
        }


        reader.readAsDataURL(file);
    };

    useEffect(() => {
        form.setValue("image", image)
    }, [image, form])

    const handleSpanClick = (event: MouseEvent<HTMLSpanElement>) => {
        event.preventDefault();
        imageRef.current?.click(); // Trigger the file input click
    };

    const handleRemove = () => {
        setImage("")
        form.setValue("image", "removed")
    }

    return (
        <div className='relative group/image w-32 h-32 overflow-hidden rounded-full bg-gradient-to-tr from-[#f12711] via-[#FDC830] to-[#f5af19]'>
            <div className='bg-white m-0.5 rounded-full'>
                <Image
                    src={image || "/user.svg"}
                    alt={alt}
                    width={100}
                    height={100}
                    priority={true}
                    className={`w-full h-full object-cover rounded-full
                    }`}
                />
                {
                    !disabled && (
                        <span className='absolute -bottom-full left-0 w-full h-full text-center flex flex-col justify-evenly items-center transition-all delay-300 ease-in-out group-hover/image:bottom-0 bg-neutral-500/50'>
                            <span onClick={handleSpanClick} className='cursor-pointer'>
                                <Camera />
                            </span>
                            <span className='cursor-pointer text-destructive' onClick={handleRemove}>
                                Remove
                            </span>
                        </span>
                    )
                }
            </div>

            <input
                ref={imageRef}
                type="file"
                name='image'
                id='image'
                disabled={disabled}
                accept='image/*'
                onChange={handleImageChange}
                multiple={false}
                aria-hidden={true}
                hidden

            />
        </div>
    )
}

export {
    FormImage, FormInput,
    FormSelect
}

