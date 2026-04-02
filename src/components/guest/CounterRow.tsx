import React from 'react';

interface CounterRowProps {
    label: string;
    subLabel: string;
    count: number;
    onIncrease: () => void;
    onDecrease: () => void;
}