import { ago } from '@/lib/date-time';
import { cn } from '@/lib/utils';
import { Clock } from 'lucide-react';
import React from 'react';

type MomentProps = { date: string | Date; placeholder?: string | null | React.ReactNode; className?: string };

export const Ago = ({ date, placeholder = null, className = '' }: MomentProps) => {
    return (
        <p className={cn('text-muted-foreground flex items-center gap-2 text-xs', className)}>
            {placeholder ? <span>{placeholder}</span> : <Clock size={13} />}
            <span>{ago(date)}</span>
        </p>
    );
};
