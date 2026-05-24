import { GeometryType, ModeType } from "../../map/control/type";

class ControlStore extends EventTarget { 
    public modeType: ModeType | null = null;
    public geometryType: GeometryType | null = null;

    setModeType(type: ModeType | null) {
        this.modeType = type;
        this.dispatchEvent(new CustomEvent('modeTypeChanged', { detail: type }));
    }

    setGeometryType(type: GeometryType | null) {
        this.geometryType = type;
        this.dispatchEvent(new CustomEvent('geometryTypeChanged', { detail: type }));
    }
}

export const controlStore = new ControlStore();