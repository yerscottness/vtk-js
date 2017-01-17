import vtkFullScreenRenderWindow  from '../../../../../Sources/Rendering/Misc/FullScreenRenderWindow';

import vtkActor                   from '../../../../../Sources/Rendering/Core/Actor';
import vtkElevationReader         from '../../../../../Sources/IO/Misc/ElevationReader';
import vtkMapper                  from '../../../../../Sources/Rendering/Core/Mapper';
import vtkTexture                 from '../../../../../Sources/Rendering/Core/Texture';

// ----------------------------------------------------------------------------
// Standard rendering code setup
// ----------------------------------------------------------------------------

const fullScreenRenderer = vtkFullScreenRenderWindow.newInstance({ background: [0, 0, 0] });
const renderer = fullScreenRenderer.getRenderer();
const renderWindow = fullScreenRenderer.getRenderWindow();

// ----------------------------------------------------------------------------
// Example code
// ----------------------------------------------------------------------------

const reader = vtkElevationReader.newInstance({ xSpacing: 0.01568, ySpacing: 0.01568, zScaling: 0.06666 });
const mapper = vtkMapper.newInstance();
const actor = vtkActor.newInstance();

mapper.setInputConnection(reader.getOutputPort());
actor.setMapper(mapper);

// Texture is `${__BASE_PATH__}/data/elevation/dem.jpg`
const img = new Image();
img.onload = function textureLoaded() {
  const texture = vtkTexture.newInstance();
  texture.setInterpolate(true);
  texture.setImage(img);
  actor.addTexture(texture);
  renderWindow.render();
};
img.src = `${__BASE_PATH__}/data/elevation/dem.jpg`;

renderer.addActor(actor);
renderer.resetCamera();
renderWindow.render();

reader.setUrl(`${__BASE_PATH__}/data/elevation/dem.csv`).then(() => {
  renderer.resetCamera();
  renderWindow.render();
});

// -----------------------------------------------------------
// Make some variables global so that you can inspect and
// modify objects in your browser's developer console:
// -----------------------------------------------------------

global.reader = reader;
global.mapper = mapper;
global.actor = actor;
global.renderer = renderer;
global.renderWindow = renderWindow;