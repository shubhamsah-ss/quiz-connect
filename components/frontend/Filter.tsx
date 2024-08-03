import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select"
import { SelectLabel } from "@radix-ui/react-select"


type SelectProps = {
    placeholder: string,
    options: SelectItemType[],
    onValueChange: (selectedItem: string) => void,
    value: string,
    rest?: React.HTMLAttributes<HTMLDivElement>
}

type SelectItemType = {
    id: string,
    name: string
}




const Filter = ({ placeholder, options, onValueChange, value, ...rest }: SelectProps) => {
    return (
        <Select name={placeholder} value={value} onValueChange={onValueChange} {...rest}>
            <SelectTrigger className="w-[280px]">
                <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                <SelectLabel className="p-2">{placeholder}</SelectLabel>
                    {
                        options.map((item) => (
                            <SelectItem className="cursor-pointer" key={`${item.id}`} value={item.name}>{item.name}</SelectItem>
                        ))
                    }
                </SelectGroup>
            </SelectContent>
        </Select>
    )
}

export default Filter