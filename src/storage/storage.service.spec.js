import { StorageService } from './storage.service';
import { STORAGE_PREFIX } from '../app.constants';

describe('StorageService', () => {
    let mockLocalStorage, storageService;

    describe('add', ()=> {
        beforeEach(() => {
            mockLocalStorage = jasmine.createSpyObj('localStorage', ['setItem', 'removeItem']);
            storageService = new StorageService(mockLocalStorage);
        });

        it('should exist', () => {
            expect(storageService.add).toBeDefined();
        });

        it('should call setItem', ()=> {
            let NEW_ITEM_KEY = "new item key";
            let newItem = {a: 2};
            let newItemSerialized = '{"a":2}';

            storageService.add(NEW_ITEM_KEY, newItem);
            expect(mockLocalStorage.setItem).toHaveBeenCalledWith(STORAGE_PREFIX + NEW_ITEM_KEY, newItemSerialized);
        });
    });

    describe('remove', ()=> {
        beforeEach(() => {
            mockLocalStorage = jasmine.createSpyObj('localStorage', ['setItem', 'removeItem']);
            storageService = new StorageService(mockLocalStorage);
        });

        it('should exist', ()=> {
            expect(storageService.remove).toBeDefined();
        });

        it('should call removeItem', ()=> {
            let NEW_ITEM_KEY = "new item key";
            let newItem = {};

            storageService.add(NEW_ITEM_KEY, newItem);
            storageService.remove(NEW_ITEM_KEY);
            expect(mockLocalStorage.removeItem).toHaveBeenCalledWith(STORAGE_PREFIX + NEW_ITEM_KEY);
        });
    });

    describe('get', ()=> {
        let NEW_ITEM_KEY = "new item key";
        let newItem = {a: 2};
        let newItemSerialized = '{"a":2}';

        beforeEach(() => {
            mockLocalStorage = jasmine.createSpyObj('localStorage', ['setItem', 'removeItem', 'getItem']);
            mockLocalStorage.getItem.and.returnValue(newItemSerialized);
            storageService = new StorageService(mockLocalStorage);
        });

        it('should exist', ()=> {
            expect(storageService.get).toBeDefined();
        });

        it('should call getItem', ()=> {
            storageService.get(NEW_ITEM_KEY);
            expect(mockLocalStorage.getItem).toHaveBeenCalledWith(STORAGE_PREFIX +NEW_ITEM_KEY);
        });

        it('should return the item of the given key', ()=> {
            var itemFromStorage = storageService.get(NEW_ITEM_KEY);
            expect(itemFromStorage).toEqual(newItem);
        })
    });

    describe('serialize', ()=>{
        let NEW_ITEM_KEY = "new item key";
        let newItem = {a: 2};
        let newItemSerialized = '{"a":2}';

        beforeEach(() => {
            mockLocalStorage = jasmine.createSpyObj('localStorage', ['setItem', 'removeItem', 'getItem']);
            storageService = new StorageService(mockLocalStorage);
        });

        it('should exist', ()=>{
            expect(storageService.serialize).toBeDefined();
        });

        it('should return serialized item', ()=> {
            var result = storageService.serialize(newItem);
            expect(result).toEqual(newItemSerialized);
        });
    });

    describe('deserialize', ()=>{
        let NEW_ITEM_KEY = "new item key";
        let newItem = {a: 2};
        let newItemSerialized = '{"a":2}';

        beforeEach(() => {
            mockLocalStorage = jasmine.createSpyObj('localStorage', ['setItem', 'removeItem', 'getItem']);
            storageService = new StorageService(mockLocalStorage);
        });

        it('should exist', ()=>{
            expect(storageService.deserialize).toBeDefined();
        });

        it('should return deserialized item', ()=> {
            var result = storageService.deserialize(newItemSerialized);
            expect(result).toEqual(newItem);
        });
    })
});
