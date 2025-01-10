import React from 'react';
import { Dialog, DialogTrigger, DialogContent } from '../ui/dialog';
import { Button } from '../ui/button';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '../ui/accordion';
import { Item } from './article';


interface PreviewDialogProps {
    items: Item[];
}
const PreviewDialog: React.FC<PreviewDialogProps> = ({ items }) => {
    const itemsWithoutId = items.map(({ id, ...rest }) => rest);

    const renderItem = (item: Omit<Item, 'id'>) => {
        switch (item.type) {
            case 'text':
                return <p className=" leading-relaxed">{item.content}</p>;
            case 'title':
                return <h2 className="text-2xl font-black ">{item.content}</h2>;
            case 'accordion':
                return (
                    <Accordion type="single" collapsible className="w-full border rounded-md mb-2">
                        <AccordionItem value="item-1" className="border-b-0">
                            <AccordionTrigger className="px-4 py-2 hover:bg-gray-50">{item.content.trigger}</AccordionTrigger>
                            <AccordionContent className="px-4 py-2 text-gray-700">
                                {item.content.content}
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                );
            default:
                return null;
        }
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline">PREVIEW</Button>
            </DialogTrigger>
            <DialogContent className="max-w-[90%] max-h-[80vh] overflow-y-auto">
                <div className="space-y-4">
                    {itemsWithoutId.map((item, index) => (
                        <div key={index} className="rounded-lg">
                            {renderItem(item)}
                        </div>
                    ))}
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default PreviewDialog;