# ngx-connection-beam

`@omnedia/ngx-connection-beam` is an Angular component that dynamically renders animated connection lines between two elements. With customizable curvature, colors, and animation settings, it creates visually striking connection beams between any two elements in your Angular application.

## Features

- Dynamic Paths: Automatically calculates and draws a smooth path between two HTML elements, with customizable curvature.
- Customizable Appearance: Control the beam’s color, width, opacity, and gradient, allowing for a wide range of visual effects.
- Smooth Animations: Animate the connection beams with customizable duration and delay, making them perfect for drawing attention to interactions or flows.
- Viewport-Aware: The component updates its dimensions and position in response to window resizing to maintain accuracy.

## Installation

Install the library using npm:

```bash
npm install @omnedia/ngx-connection-beam
```

## Usage

Import the `NgxConnectionBeamComponent` in your Angular module or component:

```typescript
import { NgxConnectionBeamComponent } from '@omnedia/ngx-connection-beam';

@Component({
  ...
  imports: [
    ...
    NgxConnectionBeamComponent,
  ],
  ...
})
```

Use the component in your template:

```html
<div class="wrapper">
    <div #elementA></div>
    <div #elementB></div>

    <om-connection-beam
    [fromRef]="elementA"
    [toRef]="elementB"
    [curvature]="50"
    [pathColor]="'#ff5733'"
    [pathWidth]="3"
    [duration]="6"
    [gradientStartColor]="'#ffcc00'"
    [gradientStopColor]="'#3498db'"
    >
    </om-connection-beam>
</div>
```

## How It Works

- Connection Line Between Elements: NgxConnectionBeamComponent connects two specified elements using an SVG path. This path is dynamically calculated based on the relative positions of the two elements, ensuring that the connection remains intact even if the window is resized.
- Smooth Animations: The connection beam can be animated using cubic easing, making the appearance of the connection more fluid and engaging.
- Customizable Gradient: With support for linear gradients, the connection beam can transition between colors for a dynamic, visually engaging effect.

## API

```html
<om-connection-beam
  [fromRef]="fromElement"
  [toRef]="toElement"
  [curvature]="curvature"
  [pathColor]="pathColor"
  [pathWidth]="pathWidth"
  [pathOpacity]="pathOpacity"
  [gradientStartColor]="gradientStartColor"
  [gradientStopColor]="gradientStopColor"
  [duration]="duration"
  [delay]="delay"
  [reverse]="reverse"
  [startXOffset]="startXOffset"
  [startYOffset]="startYOffset"
  [endXOffset]="endXOffset"
  [endYOffset]="endYOffset"
>
</om-connection-beam>
```

- `fromRef` (required): A reference to the HTML element where the connection starts.
- `toRef` (required): A reference to the HTML element where the connection ends.
- `curvature` (optional): Curvature of the beam, defining how much the path curves between the two points. Defaults to 0.
- `pathColor` (optional): The color of the connection path. Defaults to 'gray'.
- `pathWidth` (optional): The width of the connection path. Defaults to 2px.
- `pathOpacity` (optional): The opacity of the connection path. Defaults to 0.2.
- `gradientStartColor` (optional): The color at the start of the gradient. Defaults to '#ffaa40'.
- `gradientStopColor` (optional): The color at the end of the gradient. Defaults to '#9c40ff'.
- `duration` (optional): Duration of the animation in seconds. Defaults to a random value between 4 and 7.
- `delay` (optional): Delay before the animation starts, in seconds. Defaults to 0.
- `reverse` (optional): Reverses the direction of the gradient animation. Defaults to false.
- `startXOffset`, `startYOffset`, `endXOffset`, `endYOffset` (optional): Offsets to fine-tune the start and end positions of the beam relative to the elements.

## Example

```html
<div class="wrapper">
    <div #startElement></div>
    <div #endElement></div>

    <om-connection-beam
    [fromRef]="startElement"
    [toRef]="endElement"
    [curvature]="100"
    [pathColor]="'#e74c3c'"
    [gradientStartColor]="'#e74c3c'"
    [gradientStopColor]="'#9b59b6'"
    [duration]="5"
    [reverse]="true"
    >
    </om-connection-beam>
</div>
```

This example draws a curved connection beam between two elements with a red-to-purple gradient that animates over 5 seconds.

## Contributing

Contributions are welcome. Please submit a pull request or open an issue to discuss your ideas.

## License

This project is licensed under the MIT License.