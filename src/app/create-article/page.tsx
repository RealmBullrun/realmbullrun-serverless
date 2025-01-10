"use client"
import { CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useState } from "react"
// import DragAndDropEditor from "@/components/article/DragAndDropEditor"

const CreateArticlePage = () => {
    const [articleData, setArticleData] = useState(null)

    const handleMintArticle = () => {
        // Add your minting logic here
    }

    return (
        <div className="grid gap-2">
            <div className="grid gap-2 text-center">
                <h1 className="text-3xl font-bold">Create Article</h1>
                <p className="text-balance text-muted-foreground">
                    Create and Mint an article NFT for your realms.
                </p>
            </div>
            <CardContent className="bg-card pt-6 rounded-lg">
                <div className="grid gap-4">
                    {/* <DragAndDropEditor setArticleData={setArticleData} /> */}
                    <Button onClick={handleMintArticle}>Mint Article</Button>
                </div>
            </CardContent>
        </div>
    )
}

export default CreateArticlePage