# Explanation

## Interfaces

We have 2 interfaces: `GalleryService` and `GalleryDB`.

1. `GalleryService` is the API for the Gallery model.
2. `GalleryDB` defines a set of methods to interact with the database.

## Structs

We have 4 structs: `gallery`, `galleryService`, `galleryValidator` and `galleryGorm`.

1. `gallery` is the model for our gallery, it's like schema so it implements nothing.
2. `galleryService` is the actual struct which implements the `GalleryService`.
3. `galleryValidator` is like middleware, it's job is to validate the data before calling the database, so it will implement the `GalleryDB` interface.
4. `galleryGorm` is the actual struct which will implement the `GalleryDB` to interact with the database.
