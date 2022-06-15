import { ref, Ref } from "vue";

export const objects: Ref<any> = ref({} as any);
export const fullScreen: Ref<boolean> = ref(false);

export const centralPanels: Ref<any> = ref({
    diagram: false,
    animations: false,
    settings: false
})
export const loadingDefault = {
    loaded: 0,
    total: 0,
    progress: 0,
}
export const loading: Ref<any> = ref(loadingDefault)