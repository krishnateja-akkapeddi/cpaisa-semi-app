import {SliderImagesResponse} from '../../models/interfaces/SliderImagesResponse';
export interface FetchSliderImages {
  fetch(): Promise<SliderImagesResponse>;
}
