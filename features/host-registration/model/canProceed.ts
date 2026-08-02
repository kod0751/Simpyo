import type { HostFormData, StepId } from "@/lib/host";

export function canProceed(stepId: StepId, form: HostFormData): boolean {
  switch (stepId) {
    case "type":
      return form.propertyType !== "";
    case "location":
      return form.region !== "" && form.address.trim().length > 0;
    case "basics":
      return true;
    case "amenities":
      return form.tags.length > 0;
    case "photos":
      return form.photos.length > 0;
    case "describe":
      return form.title.trim().length > 0 && form.description.trim().length > 0;
    case "price":
      return form.price > 0;
    case "host":
      return (
        form.hostName.trim().length > 0 && form.hostPhone.trim().length > 0
      );
    default:
      return true;
  }
}
