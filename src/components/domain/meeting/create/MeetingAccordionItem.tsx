import {
  AccordionContent,
  AccordionHeader,
  AccordionItem,
  AccordionTrigger,
} from "@radix-ui/react-accordion";
import styles from "./MeetingAccordion.module.scss";
import type { MeetingCreationSchema } from "../../../../schemas/meetingCreationSchema";
import DownArrow from "@assets/downArrow.svg?react";
export const MeetingAccordionItem = ({
  triggerContent,
  formInputComponent,
  fieldName,
  required,
}: {
  triggerContent: {
    Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
    title: string;
    value: MeetingCreationSchema[keyof MeetingCreationSchema];
  };
  formInputComponent: React.ReactNode;
  fieldName: keyof MeetingCreationSchema;
  required?: boolean;
}) => {
  return (
    <AccordionItem value={fieldName} className={styles.accordion__item}>
      <AccordionHeader>
        <AccordionTrigger className={styles.accordion__trigger}>
          <TriggerContent
            Icon={triggerContent.Icon}
            title={triggerContent.title}
            value={triggerContent.value}
            required={required}
          />
        </AccordionTrigger>
      </AccordionHeader>
      <AccordionContent className={styles.accordion__content}>
        {formInputComponent}
      </AccordionContent>
    </AccordionItem>
  );
};

export const TriggerContent = ({
  Icon,
  title,
  value,
  required,
}: {
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  title: string;
  value: MeetingCreationSchema[keyof MeetingCreationSchema];
  required?: boolean;
}) => {
  const formatValue = (value: MeetingCreationSchema[keyof MeetingCreationSchema]) => {
    if (typeof value === "string") return value;
    if (typeof value === "number") return value.toString();
    if (value) return value.join(", ");
  };

  return (
    <>
      <Icon className={styles.accordion__trigger__icon} />
      <div className={styles.accordion__trigger__content}>
        <p className={styles.accordion__trigger__content__title}>
          {title}
          {required && <span>*</span>}
        </p>
        <p className={styles.accordion__trigger__content__value}>{formatValue(value)}</p>
      </div>
      <DownArrow className={styles.accordion__trigger__chevron} />
    </>
  );
};
