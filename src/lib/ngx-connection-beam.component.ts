import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnDestroy,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'om-connection-beam',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ngx-connection-beam.component.html',
  styleUrl: './ngx-connection-beam.component.scss',
})
export class NgxConnectionBeamComponent implements AfterViewInit, OnDestroy {
  @ViewChild('OmConnectionBeamWrapper') wrapper!: ElementRef<HTMLElement>;

  @Input('fromRef')
  fromRef!: HTMLElement;

  @Input('toRef')
  toRef!: HTMLElement;

  @Input('curvature')
  curvature: number = 0;

  @Input('reverse')
  set reverseValue(reverse: boolean) {
    this.isReverse = reverse;
    this.updatePath();
  }

  isReverse = false;

  @Input('pathColor')
  pathColor: string = 'gray';

  @Input('pathWidth')
  pathWidth: number = 2;

  @Input('pathOpacity')
  pathOpacity: number = 0.2;

  @Input('gradientStartColor')
  gradientStartColor: string = '#ffaa40';

  @Input('gradientStopColor')
  gradientStopColor: string = '#9c40ff';

  @Input('delay')
  delay: number = 0;

  @Input('duration')
  duration: number = Math.random() * 3 + 4;

  @Input('startXOffset')
  startXOffset: number = 0;

  @Input('startYOffset')
  startYOffset: number = 0;

  @Input('endXOffset')
  endXOffset: number = 0;

  @Input('endYOffset')
  endYOffset: number = 0;

  path: string = '';
  svgDimensions = { width: 0, height: 0 };

  id = crypto.randomUUID();

  gradientCoordinates = {
    x1: ['100%', '0%'],
    x2: ['100%', '0%'],
    y1: ['0%', '0%'],
    y2: ['0%', '0%'],
  };

  private startTime: number | null = null;
  private animationFrameId: number | null = null;

  private resizeTimeout: any;

  ngAfterViewInit(): void {
    if (!this.fromRef || !this.toRef) {
      throw new Error(
        'ngx-connection-beam: One or both RefElements are missing!'
      );
    }

    this.updatePath();
    this.animate();

    window.addEventListener('resize', () => this.handleResize());
  }

  ngOnDestroy(): void {
    window.removeEventListener('resize', () => this.handleResize());

    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }
  }

  handleResize = () => {
    clearTimeout(this.resizeTimeout);
    this.resizeTimeout = setTimeout(() => {
      this.updatePath();
    }, 100);
  };

  updatePath(): void {
    const containerRect = this.wrapper.nativeElement.getBoundingClientRect();
    const rectA = this.fromRef.getBoundingClientRect();
    const rectB = this.toRef.getBoundingClientRect();

    const svgWidth = containerRect.width;
    const svgHeight = containerRect.height;
    this.svgDimensions = { width: svgWidth, height: svgHeight };

    // Calculate the centers of the elements
    const startX =
      rectA.left - containerRect.left + rectA.width / 2 + this.startXOffset;
    const startY =
      rectA.top - containerRect.top + rectA.height / 2 + this.startYOffset;
    const endX =
      rectB.left - containerRect.left + rectB.width / 2 + this.endXOffset;
    const endY =
      rectB.top - containerRect.top + rectB.height / 2 + this.endYOffset;

    const deltaX = endX - startX;
    const deltaY = endY - startY;

    const isVertical = Math.abs(deltaY) > Math.abs(deltaX);

    if (this.curvature === 0) {
      this.path = `M ${startX},${startY} L ${endX},${endY}`;
    } else {
      const midX = (startX + endX) / 2;
      const midY = (startY + endY) / 2;

      let controlX = midX;
      let controlY = midY;

      if (isVertical) {
        controlX = midX - this.curvature;
      } else {
        controlY = midY - this.curvature;
      }

      this.path = `M ${startX},${startY} Q ${controlX},${controlY} ${endX},${endY}`;
    }

    if (isVertical) {
      if (this.isReverse) {
        this.gradientCoordinates = {
          x1: ['0%', '0%'],
          x2: ['0%', '0%'],
          y1: ['90%', '-10%'],
          y2: ['100%', '0%'],
        };
      } else {
        this.gradientCoordinates = {
          x1: ['0%', '0%'],
          x2: ['0%', '0%'],
          y1: ['10%', '110%'],
          y2: ['0%', '100%'],
        };
      }
    } else {
      if (this.isReverse) {
        this.gradientCoordinates = {
          x1: ['90%', '-10%'],
          x2: ['100%', '0%'],
          y1: ['0%', '0%'],
          y2: ['0%', '0%'],
        };
      } else {
        this.gradientCoordinates = {
          x1: ['10%', '110%'],
          x2: ['0%', '100%'],
          y1: ['0%', '0%'],
          y2: ['0%', '0%'],
        };
      }
    }
  }

  cubicEasing(t: number): number {
    return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
  }

  interpolatePercentage(start: string, end: string, progress: number): string {
    const startValue = parseFloat(start);
    const endValue = parseFloat(end);
    return `${startValue + (endValue - startValue) * progress}%`;
  }

  animate(): void {
    const duration = this.duration * 1000;

    const animateFrame = (timestamp: number) => {
      if (!this.startTime) {
        this.startTime = timestamp + this.delay * 1000;
      }

      const elapsed = timestamp - this.startTime;
      const t = Math.min(elapsed / duration, 1);
      const easedT = this.cubicEasing(t);

      const x1 = this.interpolatePercentage(
        this.gradientCoordinates.x1[0],
        this.gradientCoordinates.x1[1],
        easedT
      );
      const x2 = this.interpolatePercentage(
        this.gradientCoordinates.x2[0],
        this.gradientCoordinates.x2[1],
        easedT
      );
      const y1 = this.interpolatePercentage(
        this.gradientCoordinates.y1[0],
        this.gradientCoordinates.y1[1],
        easedT
      );
      const y2 = this.interpolatePercentage(
        this.gradientCoordinates.y2[0],
        this.gradientCoordinates.y2[1],
        easedT
      );

      const gradientElement =
        this.wrapper.nativeElement.querySelector('linearGradient');
      if (gradientElement) {
        gradientElement.setAttribute('x1', x1);
        gradientElement.setAttribute('x2', x2);
        gradientElement.setAttribute('y1', y1);
        gradientElement.setAttribute('y2', y2);
      }

      if (elapsed < duration) {
        this.animationFrameId = requestAnimationFrame(animateFrame);
      } else {
        this.startTime = null;
        this.animationFrameId = requestAnimationFrame(animateFrame);
      }
    };

    this.animationFrameId = requestAnimationFrame(animateFrame);
  }
}
