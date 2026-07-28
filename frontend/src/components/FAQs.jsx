import React from 'react'
import { SectionHeading } from './ui/SectionHeading'
import { LANDING } from "../data/testIds";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/Accordion'
import { faqs } from '../data/mockData'

export const FAQs = () => {
    return (
        <>
            <section id="faq" data-testid={LANDING.faqSection} className="border-t border-border bg-muted/20">
                <div className="mx-auto max-w-3xl px-5 sm:px-8 py-20 sm:py-28">
                    <SectionHeading label="FAQ" title={<>Answers to what candidates ask us most.</>} />
                    <div className="mt-10">
                        <Accordion className="w-full">
                            {faqs.map((f, i) => (
                                <AccordionItem key={i} value={"item-" + i} className="border-border">
                                    <AccordionTrigger className="text-left font-semibold hover:no-underline">{f.q}</AccordionTrigger>
                                    <AccordionContent className="text-muted-foreground leading-relaxed">{f.a}</AccordionContent>
                                </AccordionItem>
                            ))}
                        </Accordion>
                    </div>
                </div>
            </section>
        </>
    )
}
