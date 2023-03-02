export interface SliderImagesResponse {
  success: boolean;
  slider_images?: SliderImageEntity[] | null;
  total: number;
  last_page: number;
}
export interface SliderImageEntity {
  id: number;
  url: string;
  status: string;
  organization_id: number;
  team_id: number;
  priority: number;
  state: string;
  dynamic_link?: null;
}
