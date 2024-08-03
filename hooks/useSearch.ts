import { makeGetRequest } from "@/lib/apiResponse"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useCallback, useEffect, useState } from "react"

type FilterItemsData = {
    categories: { id: string; name: string }[];
    subjects: { id: string; name: string }[];
    topics: { id: string; name: string }[];
}

type FilterValues = {
    category: string,
    subject: string,
    topic: string
}

const useSearch = () => {
    const pathname = usePathname()
    const searchParams = useSearchParams()
    const router = useRouter()
    
    const [filterItemsData, setFilterItemsData] = useState<FilterItemsData>({
        categories: [],
        subjects: [],
        topics: []
    })

    const [filterValues, setFilterValues] = useState<FilterValues>({
        category: "",
        subject: "",
        topic: ""
    })

    let category = searchParams.get("category") as string || ""
    let subject = searchParams.get("subject") as string || ""
    let topic = searchParams.get("topic") as string || ""

    // Fetch categories data on component mount
    const fetchCategories = useCallback(async () => {
        const categoriesData = await makeGetRequest("/categories");
        
        setFilterItemsData(prev => ({
            ...prev,
            categories: categoriesData.data
        }));
    },[])

    useEffect(() => {

        fetchCategories();
    }, []);

    const handleCategoryChange = useCallback(async (category: string) => {
        const query = new URLSearchParams(searchParams)
        if (category) query.set("category", category)
        query.delete("subject")
        query.delete("topic")
        setFilterValues(prev => ({
            ...prev,
            subject: "",
            topic: ""
        }))
        router.replace(`${pathname}?${query}`)
    }, [searchParams, router, pathname])

    // Fetch subjects data when category changes
    const fetchSubjects = useCallback(async () => {
        if (category) {
            const subjectsData = await makeGetRequest(`subjects?category=${category}`);
            setFilterItemsData(prev => ({
                ...prev,
                subjects: subjectsData.data
            }));
        }
    },[category])

    useEffect(() => {
        fetchSubjects()
    }, [category])

    const handleSubjectChange = useCallback(async (subject: string) => {
        const query = new URLSearchParams(searchParams)
        if (subject) query.set("subject", subject)
        query.delete("topic")
        setFilterValues(prev => ({
            ...prev,
            topic: ""
        }))
        router.replace(`${pathname}?${query}`)
    }, [searchParams, router, pathname])

    // Fetch topics data when subject changes
    const fetchTopics = useCallback(async () => {
        if (subject) {
            const topicsData = await makeGetRequest(`topics?subject=${subject}`);
            setFilterItemsData(prev => ({
                ...prev,
                topics: topicsData.data
            }));
        }
    }, [subject])

    useEffect(() => {
        fetchTopics()
    }, [subject])

    const handleTopicChange = useCallback(async (topic: string) => {
        const query = new URLSearchParams(searchParams)
        if (topic) query.set("topic", topic)
        router.replace(`${pathname}?${query}`)
    }, [searchParams, router, pathname])

    useEffect(() => {
        const query = new URLSearchParams(searchParams);
        if (category) {
            const newcategory = category.trim().toUpperCase();
            query.set("category", newcategory);
            setFilterValues(prev => ({
                ...prev,
                category: newcategory || ""
            }));
        }
        if (subject) {
            const newsubject = subject
                .trim()
                .split(" ")
                .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
                .join(" ");
            query.set("subject", newsubject);
            setFilterValues(prev => ({
                ...prev,
                subject: newsubject || ""
            }));
        }
        if (topic) {
            const newtopic = topic
                .trim()
                .split(" ")
                .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
                .join(" ");
            query.set("topic", newtopic);
            setFilterValues(prev => ({
                ...prev,
                topic: newtopic || ""
            }));
        }

        if(category == "") {
            query.delete("category")
            query.delete("subject")
            query.delete("topic")
            setFilterValues(prev => ({
                category: "",
                subject: "",
                topic: ""
            }))
        }

        if(subject == "") {
            query.delete("subject")
            query.delete("topic")
            setFilterValues(prev => ({
                ...prev,
                subject: "",
                topic: ""
            }))
        }

        if(topic == "") {
            query.delete("topic")
            setFilterValues(prev => ({
                ...prev,
                topic: ""
            }))
        }

        router.replace(`${pathname}?${query.toString()}`);
    }, [category, subject, topic, pathname, router, searchParams])

    const filterItems = [
        {
            placeholder: "Category",
            items: filterItemsData.categories,
            onValueChange: handleCategoryChange,
            value: filterValues.category
        },
        {
            placeholder: "Subject",
            items: filterItemsData.subjects,
            onValueChange: handleSubjectChange,
            value: filterValues.subject
        },
        {
            placeholder: "Topic",
            items: filterItemsData.topics,
            onValueChange: handleTopicChange,
            value: filterValues.topic
        }
    ]

    const query = {
        ...(category && { category }),
        ...(subject && { subject }),
        ...(topic && { topic })
    };

    return { filterItems, query}
}

export default useSearch