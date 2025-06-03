import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { venueApi, Venue } from '@/lib/api/venue';

interface VenueState {
    venues: Record<string, Venue>;
    currentVenue: Venue | null;
    loading: boolean;
    error: string | null;
}

const initialState: VenueState = {
    venues: {},
    currentVenue: null,
    loading: false,
    error: null,
};

export const fetchVenue = createAsyncThunk(
    'venue/fetchVenue',
    async (id: string) => {
        const response = await venueApi.getVenue(id);
        return response;
    }
);

const venueSlice = createSlice({
    name: 'venue',
    initialState,
    reducers: {
        clearCurrentVenue: (state) => {
            state.currentVenue = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchVenue.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchVenue.fulfilled, (state, action: PayloadAction<Venue>) => {
                state.loading = false;
                state.currentVenue = action.payload;
                state.venues[action.payload.id] = action.payload;
            })
            .addCase(fetchVenue.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch venue';
            });
    },
});

export const { clearCurrentVenue } = venueSlice.actions;
export default venueSlice.reducer;