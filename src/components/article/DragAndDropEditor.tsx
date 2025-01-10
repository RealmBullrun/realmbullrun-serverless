import React, { useState } from 'react';
import {
    arrayMove,
    SortableContext,
    useSortable,
    verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion';
import { closestCenter, DndContext, useDroppable } from '@dnd-kit/core';
import { Button } from '../ui/button';
import PreviewDialog from './PreviewDialog';

interface DraggableItemProps {
    id: string;
    children: React.ReactNode;
}

const DraggableItem: React.FC<DraggableItemProps> = ({ id, children }) => {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    return (
        <div ref={setNodeRef} style={style} {...attributes}>
            <div className="drag-handle cursor-move" {...listeners}>
                <svg width="32px" height="32px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g id="Interface / Drag_Horizontal"> <g id="Vector"> <path d="M18 14C17.4477 14 17 14.4477 17 15C17 15.5523 17.4477 16 18 16C18.5523 16 19 15.5523 19 15C19 14.4477 18.5523 14 18 14Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M12 14C11.4477 14 11 14.4477 11 15C11 15.5523 11.4477 16 12 16C12.5523 16 13 15.5523 13 15C13 14.4477 12.5523 14 12 14Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M6 14C5.44772 14 5 14.4477 5 15C5 15.5523 5.44772 16 6 16C6.55228 16 7 15.5523 7 15C7 14.4477 6.55228 14 6 14Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M18 8C17.4477 8 17 8.44772 17 9C17 9.55228 17.4477 10 18 10C18.5523 10 19 9.55228 19 9C19 8.44772 18.5523 8 18 8Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M12 8C11.4477 8 11 8.44772 11 9C11 9.55228 11.4477 10 12 10C12.5523 10 13 9.55228 13 9C13 8.44772 12.5523 8 12 8Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M6 8C5.44772 8 5 8.44772 5 9C5 9.55228 5.44772 10 6 10C6.55228 10 7 9.55228 7 9C7 8.44772 6.55228 8 6 8Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g> </g> </g></svg>
            </div>
            {children}
        </div>
    );
};

interface DroppableAreaProps {
    id: string;
    children: React.ReactNode;
}

const DroppableArea: React.FC<DroppableAreaProps> = ({ id, children }) => {
    const { setNodeRef } = useDroppable({ id });

    return (
        <div ref={setNodeRef} className="droppable-area p-4 border-2 border-dashed border-gray-300 rounded-lg">
            {children}
        </div>
    );
};

interface DragAndDropEditorProps {
    setArticleData: (data: any) => void;
    mnemonic: string;
    network: string;
    walletData: any;
    showAlert: (message: string) => void;
}

interface Item {
    id: string;
    type: string;
    content: any;
}

const DragAndDropEditor: React.FC<DragAndDropEditorProps> = ({ setArticleData }) => {
    const [items, setItems] = useState<Item[]>([]);

    const addItem = (type: string) => {
        const newItem: Item = { id: `item-${items.length + 1}`, type, content: '' };
        if (type === 'accordion') {
            newItem.content = { trigger: '', content: '' };
        }
        setItems([...items, newItem]);
    };

    const updateItemContent = (id: string, content: any) => {
        const updatedItems = items.map(item => item.id === id ? { ...item, content } : item);
        setItems(updatedItems);
        setArticleData(updatedItems);
    };

    const removeItem = (id: string) => {
        const updatedItems = items.filter(item => item.id !== id);
        setItems(updatedItems);
        setArticleData(updatedItems);
    };

    const handleDragEnd = (event: any) => {
        const { active, over } = event;
        if (active.id !== over.id) {
            setItems((items) => {
                const oldIndex = items.findIndex(item => item.id === active.id);
                const newIndex = items.findIndex(item => item.id === over.id);
                return arrayMove(items, oldIndex, newIndex);
            });
        }
    };

    const renderItem = (item: Item) => {
        switch (item.type) {
            case 'text':
                return <p>{item.content}</p>;
            case 'title':
                return <h2>{item.content}</h2>;
            case 'accordion':
                return (
                    <Accordion type="single" collapsible className="w-full">
                        <AccordionItem value="item-1">
                            <AccordionTrigger>{item.content.trigger}</AccordionTrigger>
                            <AccordionContent>
                                {item.content.content}
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                );
            default:
                return null;
        }
    };

    const logItems = () => {
        const itemsWithoutId = items.map(({ id, ...rest }) => rest);
        console.log(itemsWithoutId);
    };

    const mintArticle = async (userSatsByte: number) => {
        if (!walletData.connected) {
            showAlert("Connect your wallet to continue.");
            return;
        }

        if (items.length === 0) {
            showAlert("You should add some content to your article.");
            return;
        }

        const funding_address = await createKeyPair(mnemonic, "m/86'/0'/0'/1/0");
        const { WIF } = funding_address;

        const atomicals = new Atomicals(ElectrumApi.createClient((network === 'testnet' ? process.env.NEXT_PUBLIC_WIZZ_PROXY_TESTNET : process.env.NEXT_PUBLIC_WIZZ_PROXY) || ''));

        try {
            await atomicals.electrumApi.open();

            const articleJson = {
                name: "My Article", // You might want to add a title input field
                description: "An article created on RealmbullRun",
                items: items.map(({ id, ...rest }) => rest) // Remove the id property from each item
            };

            const command: CommandInterface = new MintArticleNftCommand(
                atomicals.electrumApi,
                { satsbyte: userSatsByte },
                walletData.primary_addr,
                WIF,
                articleJson,
                pushInfo
            );

            const res = await command.run(pushInfo);
        } catch (error: any) {
            console.error("Error minting article:", error);
            showAlert("Failed to mint article. Please try again.");
        } finally {
            atomicals.electrumApi.close();
        }
    };

    const pushInfo = ({ state, data, qrcode }: { state?: any, data?: any, qrcode?: string }) => {
        // ... implement pushInfo logic similar to profile minting ...
    };

    return (
        <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            <div className="editor-controls flex flex-wrap gap-2 mb-4 p-2">
                <button className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm" onClick={() => addItem('text')}>Add Text</button>
                <button className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 text-sm" onClick={() => addItem('title')}>Add Title</button>
                <button className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600 text-sm" onClick={() => addItem('accordion')}>Add Accordion</button>
                {/* <button className="px-3 py-1 bg-gray-500 text-white rounded hover:bg-gray-600 text-sm" onClick={logItems}>Log Items</button> */}
                {/*   <Button
                    className=""
                    onClick={() => {
                        if (!walletData.connected) {
                            showAlert("Connect your wallet to continue.");
                            return;
                        }

                        if (items.length === 0) {
                            showAlert("You should add some content to your article.");
                            return;
                        }

                        // You might want to implement a function to open the satsbyte window
                        // and then call mintArticle with the selected satsbyte value
                        openSatsbyteWindow("mint");
                    }}
                >
                    Mint Article
                </Button> */}
                <PreviewDialog items={items} />
            </div>
            <DroppableArea id="editor">
                <SortableContext items={items} strategy={verticalListSortingStrategy}>
                    {items.map(item => (
                        <DraggableItem key={item.id} id={item.id}>
                            <div className="mb-4 p-4 border rounded-lg w-full">
                                <div className="flex flex-wrap justify-between items-center mb-2 gap-2">
                                    <span className="font-bold">{item.type.charAt(0).toUpperCase() + item.type.slice(1)}</span>
                                    <Button
                                        className="w-8 h-8 bg-red-500 p-0 text-white rounded hover:bg-red-600 flex items-center justify-center"
                                        onClick={() => removeItem(item.id)}
                                    >
                                        <svg className='w-6 h-6' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor">
                                            <svg className='w-12 h-12' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M4 6H20M16 6L15.7294 5.18807C15.4671 4.40125 15.3359 4.00784 15.0927 3.71698C14.8779 3.46013 14.6021 3.26132 14.2905 3.13878C13.9376 3 13.523 3 12.6936 3H11.3064C10.477 3 10.0624 3 9.70951 3.13878C9.39792 3.26132 9.12208 3.46013 8.90729 3.71698C8.66405 4.00784 8.53292 4.40125 8.27064 5.18807L8 6M18 6V16.2C18 17.8802 18 18.7202 17.673 19.362C17.3854 19.9265 16.9265 20.3854 16.362 20.673C15.7202 21 14.8802 21 13.2 21H10.8C9.11984 21 8.27976 21 7.63803 20.673C7.07354 20.3854 6.6146 19.9265 6.32698 19.362C6 18.7202 6 17.8802 6 16.2V6M14 10V17M10 10V17" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
                                        </svg>
                                    </Button>
                                </div>
                                {item.type === 'accordion' ? (
                                    <div className='flex flex-col gap-2'>
                                        <p>Trigger</p>
                                        <input
                                            type="text"
                                            className="w-full p-2 border rounded mb-2"
                                            placeholder="Enter accordion trigger"
                                            value={item.content.trigger}
                                            onChange={(e) => updateItemContent(item.id, { ...item.content, trigger: e.target.value })}
                                        />
                                        <p>Content</p>
                                        <textarea
                                            className="w-full p-2 border rounded mb-2"
                                            placeholder="Enter accordion content"
                                            value={item.content.content}
                                            onChange={(e) => updateItemContent(item.id, { ...item.content, content: e.target.value })}
                                            rows={3}
                                        />
                                    </div>
                                ) : (
                                    <input
                                        type="text"
                                        className="w-full p-2 border rounded mb-2"
                                        placeholder={`Enter ${item.type} content`}
                                        value={item.content}
                                        onChange={(e) => updateItemContent(item.id, e.target.value)}
                                    />
                                )}
                                {renderItem(item)}
                            </div>
                        </DraggableItem>
                    ))}
                </SortableContext>
            </DroppableArea>
        </DndContext>
    );
};

export default DragAndDropEditor;