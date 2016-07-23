import { StorageService } from './storage.service';
import { STORAGE_PREFIX } from '../framework.constants';

describe('StorageService', () => {
    let mockLocalStorage;
    let storageService;

    describe('add', () => {
        beforeEach(() => {
            mockLocalStorage = jasmine.createSpyObj('localStorage', ['setItem', 'removeItem']);
            storageService = new StorageService(mockLocalStorage);
        });

        it('should exist', () => {
            expect(storageService.add).toBeDefined();
        });

        it('should call setItem', () => {
            const NEW_ITEM_KEY = 'new item key';
            const newItem = { a: 2 };
            const newItemSerialized = '{"a":2}';

            storageService.add(NEW_ITEM_KEY, newItem);
            expect(mockLocalStorage.setItem)
                .toHaveBeenCalledWith(STORAGE_PREFIX + NEW_ITEM_KEY, newItemSerialized);
        });
    });

    describe('remove', () => {
        beforeEach(() => {
            mockLocalStorage = jasmine.createSpyObj('localStorage', ['setItem', 'removeItem']);
            storageService = new StorageService(mockLocalStorage);
        });

        it('should exist', () => {
            expect(storageService.remove).toBeDefined();
        });

        it('should call removeItem', () => {
            const NEW_ITEM_KEY = 'new item key';
            const newItem = {};

            storageService.add(NEW_ITEM_KEY, newItem);
            storageService.remove(NEW_ITEM_KEY);
            expect(mockLocalStorage.removeItem)
                .toHaveBeenCalledWith(STORAGE_PREFIX + NEW_ITEM_KEY);
        });
    });

    describe('get', () => {
        const NEW_ITEM_KEY = 'new item key';
        const newItem = { a: 2 };
        const newItemSerialized = '{"a":2}';

        beforeEach(() => {
            mockLocalStorage = jasmine.createSpyObj('localStorage',
                ['setItem', 'removeItem', 'getItem']);
            mockLocalStorage.getItem.and.returnValue(newItemSerialized);
            storageService = new StorageService(mockLocalStorage);
        });

        it('should exist', () => {
            expect(storageService.get).toBeDefined();
        });

        it('should call getItem', () => {
            storageService.get(NEW_ITEM_KEY);
            expect(mockLocalStorage.getItem).toHaveBeenCalledWith(STORAGE_PREFIX + NEW_ITEM_KEY);
        });

        it('should return the item of the given key', () => {
            const itemFromStorage = storageService.get(NEW_ITEM_KEY);
            expect(itemFromStorage).toEqual(newItem);
        });

        it('should return empty string when there is no such key', () => {
            mockLocalStorage.getItem.and.returnValue(undefined);
            storageService = new StorageService(mockLocalStorage);
            const itemFromStorage = storageService.get(NEW_ITEM_KEY);
            expect(itemFromStorage).toEqual('');
        });
    });

    describe('serialize', () => {
        const newItem = { a: 2 };
        const newItemSerialized = '{"a":2}';

        beforeEach(() => {
            mockLocalStorage = jasmine.createSpyObj('localStorage',
                ['setItem', 'removeItem', 'getItem']);
            storageService = new StorageService(mockLocalStorage);
        });

        it('should exist', () => {
            expect(storageService.serialize).toBeDefined();
        });

        it('should return serialized item', () => {
            const result = storageService.serialize(newItem);
            expect(result).toEqual(newItemSerialized);
        });
    });

    describe('deserialize', () => {
        const newItem = { a: 2 };
        const newItemSerialized = '{"a":2}';

        beforeEach(() => {
            mockLocalStorage = jasmine.createSpyObj('localStorage',
                ['setItem', 'removeItem', 'getItem']);
            storageService = new StorageService(mockLocalStorage);
        });

        it('should exist', () => {
            expect(storageService.deserialize).toBeDefined();
        });

        it('should return deserialized item', () => {
            const result = storageService.deserialize(newItemSerialized);
            expect(result).toEqual(newItem);
        });
    });
});
