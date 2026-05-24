import { GEOMETRY_TYPE_CHANGED, MODE_TYPE_CHANGED } from "../const/store-const";
import { GeometryType, ModeType } from "../control/type";
import { DrawPointEvent } from "../event/draw-point-event";
import { DrawEvent } from "../event/type";

class ControlStore extends EventTarget { 
    public modeType: ModeType | null = null;
    public geometryType: GeometryType | null = null;
    public drawEvent: DrawEvent | null = null;

    setModeType(type: ModeType | null) {
        this.modeType = type;
        this.dispatchEvent(new CustomEvent(MODE_TYPE_CHANGED, { detail: type }));
    }

    setGeometryType(type: GeometryType | null) {
        this.geometryType = type;
        switch (type) { 
            case 'point':
                this.drawEvent = new DrawPointEvent();
                break;
            default:
                this.drawEvent = null;
                break;
        }
        this.dispatchEvent(new CustomEvent(GEOMETRY_TYPE_CHANGED, { detail: type }));
    }
}

export const controlStore = new ControlStore();