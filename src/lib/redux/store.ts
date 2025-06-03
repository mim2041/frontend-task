import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { encryptTransform } from 'redux-persist-transform-encrypt';
import authReducer from './slices/authSlice';
import venueReducer from './slices/venueSlice';

const encryptor = encryptTransform({
    secretKey: process.env.NEXT_PUBLIC_REDUX_SECRET || 'my-super-secret-key',
    onError: function (error) {
        console.error('Redux Persist Encryption Error:', error);
    },
});

const authPersistConfig = {
    key: 'auth',
    storage,
    transforms: [encryptor],
    whitelist: ['user', 'token', 'isAuthenticated'],
};

const persistedAuthReducer = persistReducer(authPersistConfig, authReducer);

export const store = configureStore({
    reducer: {
        auth: persistedAuthReducer,
        venue: venueReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
            },
        }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;