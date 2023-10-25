import * as Accordion from "@radix-ui/react-accordion";
import { ReactNode } from "react";

function AccordionHeader({ children }: { children: ReactNode }) {
  return (
    <Accordion.Header className=" text-breadgray-ultra-white text-xl font-semibold">
      {children}
    </Accordion.Header>
  );
}

function AccordionContent({ children }: { children: ReactNode }) {
  return (
    <Accordion.Content>
      <div className="border-t-[1px] border-breadviolet-shaded py-6">
        {children}
      </div>
    </Accordion.Content>
  );
}

export default function FAQ() {
  return (
    <section className="pt-32 px-4 max-w-xl m-auto">
      <Accordion.Root type="single" className="flex flex-col gap-4">
        <Accordion.Item
          value="first"
          className="flex flex-col gap-4 bg-breadgray-charcoal p-4 px-6 rounded"
        >
          <AccordionHeader>
            <Accordion.Trigger className="w-full text-left">
              What is <span className="font-bold">$BREAD</span>?
            </Accordion.Trigger>
          </AccordionHeader>
          <AccordionContent>2111111111content its yea woo</AccordionContent>
        </Accordion.Item>
        <Accordion.Item
          value="second"
          className="flex flex-col gap-4 bg-breadgray-charcoal p-4 px-6 rounded"
        >
          <AccordionHeader>
            <Accordion.Trigger className="w-full text-left">
              How does <span className="font-bold">$BREAD</span> maintain 1 USD?
            </Accordion.Trigger>
          </AccordionHeader>
          <AccordionContent>222222content its yea woo</AccordionContent>
        </Accordion.Item>
        <Accordion.Item
          value="third"
          className="flex flex-col gap-4 bg-breadgray-charcoal p-4 px-6 rounded"
        >
          <AccordionHeader>
            <Accordion.Trigger className="w-full text-left">
              What can I do with <span className="font-bold">$BREAD</span>?
            </Accordion.Trigger>
          </AccordionHeader>
          <AccordionContent>3333333content its yea woo</AccordionContent>
        </Accordion.Item>
        <Accordion.Item
          value="fourth"
          className="flex flex-col gap-4 bg-breadgray-charcoal p-4 px-6 rounded"
        >
          <AccordionHeader>
            <Accordion.Trigger className="w-full text-left">
              How do I get my DAI back?
            </Accordion.Trigger>
          </AccordionHeader>
          <AccordionContent>c444444ontent its yea woo</AccordionContent>
        </Accordion.Item>
        <Accordion.Item
          value="fourth"
          className="flex flex-col gap-4 bg-breadgray-charcoal p-4 px-6 rounded"
        >
          <AccordionHeader>
            <Accordion.Trigger className="w-full text-left">
              How does <span className="font-bold">$BREAD</span> assist a
              post-capitalist future?
            </Accordion.Trigger>
          </AccordionHeader>
          <AccordionContent>c444444ontent its yea woo</AccordionContent>
        </Accordion.Item>
      </Accordion.Root>
    </section>
  );
}
