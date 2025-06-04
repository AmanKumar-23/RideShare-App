declare namespace google.maps.places {
  interface PlaceResult {
    address_components?: AddressComponent[];
    formatted_address?: string;
    geometry?: {
      location: LatLng;
      viewport?: LatLngBounds;
    };
    name?: string;
    place_id?: string;
    types?: string[];
  }

  interface AddressComponent {
    long_name: string;
    short_name: string;
    types: string[];
  }

  class Autocomplete {
    constructor(inputField: HTMLInputElement, options?: AutocompleteOptions);
    addListener(eventName: string, handler: () => void): MapsEventListener;
    getPlace(): PlaceResult;
  }

  interface AutocompleteOptions {
    bounds?: LatLngBounds | LatLngBoundsLiteral;
    componentRestrictions?: ComponentRestrictions;
    types?: string[];
    fields?: string[];
  }

  interface ComponentRestrictions {
    country: string | string[];
  }
}

interface MapsEventListener {
  remove(): void;
}

// Add this to extend the Window interface
interface Window {
  google?: typeof google;
} 