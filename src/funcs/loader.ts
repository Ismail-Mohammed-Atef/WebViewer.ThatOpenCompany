

export async function ifcloader(ifcloaderFragment, World) {
  ifcloaderFragment.settings.webIfc.COORDINATE_TO_ORIGIN = false;

  await ifcloaderFragment.setup();

  const fileOpener = document.createElement("input");
  fileOpener.type = "file";
  fileOpener.accept = ".ifc";
  fileOpener.onchange = async () => {
    if (fileOpener.files === null || fileOpener.files.length === 0) return;
    const file = fileOpener.files[0];
    fileOpener.remove();

    // loading ifc
    const buffer = await file.arrayBuffer();
    const data = new Uint8Array(buffer);
    const model = await ifcloaderFragment.load(data);

    World.scene.three.add(model);
  };
  fileOpener.click();
}
