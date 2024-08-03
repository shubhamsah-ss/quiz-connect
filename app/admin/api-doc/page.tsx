"use client"
import dynamic from "next/dynamic"
import "swagger-ui-react/swagger-ui.css"
const SwaggerUI = dynamic(()=>import("swagger-ui-react"))

const DocPage = () => {
    return (
        <SwaggerUI url="/openapi.json" />
    )
}

export default DocPage