// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useState } from 'react';
import { IconButton } from '@fluentui/react';
import { Stage, Layer, Rect, Circle, Shape, Text, Group } from 'react-konva';

type ItemPosition = {
    x: number;
    y: number;
};

export default function App() {
    const [itemPosition, setItemPosition] = useState<ItemPosition>({ x: 50, y: 50 });
    const [isDragging, setIsDragging] = useState(false);

    return (
        <>
            <IconButton iconProps={{ iconName: 'Refresh' }} onClick={() => document.location.reload()} />
            <Stage width={window.innerWidth} height={window.innerHeight}>
                <Layer>


                    <Group draggable
                        x={itemPosition.x}
                        y={itemPosition.y}
                        onDragStart={() => {
                            setIsDragging(true);
                        }}
                        onDragEnd={(e) => {
                            setIsDragging(false);
                            setItemPosition({
                                x: e.target.x(),
                                y: e.target.y()
                            });
                        }}
                        rotation={isDragging ? -5 : 0}
                    >
                        <Shape
                            sceneFunc={(context, shape) => {
                                context.beginPath();
                                context.moveTo(0, 10);
                                context.lineTo(10, 0);
                                context.lineTo(100, 0);
                                context.lineTo(110, 10);
                                context.lineTo(100, 20);
                                context.lineTo(10, 20);
                                context.closePath();
                                context.fillStrokeShape(shape);
                            }}
                            fill={isDragging ? '#ddd' : 'white'}
                            stroke="black"
                            strokeWidth={2}
                            shadowColor="black"
                            shadowBlur={10}
                            shadowOffsetX={10}
                            shadowOffsetY={10}
                            shadowOpacity={0.2}
                        />

                        <Text text="Hello World" fontSize={20} />
                    </Group>
                </Layer>
            </Stage>
        </>
    );
}
