// https://www.sanity.io/docs/structure-builder-cheat-sheet
const SINGLETON_TYPES = ["about", "toolkit"];

export const structure = (S) =>
  S.list()
    .title("Content")
    .items([
      S.listItem()
        .title("About Section")
        .id("about")
        .child(S.document().schemaType("about").documentId("about")),
      S.listItem()
        .title("Toolkit Section")
        .id("toolkit")
        .child(S.document().schemaType("toolkit").documentId("toolkit")),
      S.divider(),
      ...S.documentTypeListItems().filter(
        (item) => !SINGLETON_TYPES.includes(item.getId()),
      ),
    ]);
