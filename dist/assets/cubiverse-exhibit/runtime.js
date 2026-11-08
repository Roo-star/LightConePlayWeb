var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key2 of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key2) && key2 !== except)
        __defProp(to, key2, { get: () => from[key2], enumerable: !(desc = __getOwnPropDesc(from, key2)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// ../Cubiverse/src/numpuz-v13.css
var require_numpuz_v13 = __commonJS({
  "../Cubiverse/src/numpuz-v13.css"(exports, module) {
    module.exports = {};
  }
});

// ../Cubiverse/src/match3-v13.css
var require_match3_v13 = __commonJS({
  "../Cubiverse/src/match3-v13.css"(exports, module) {
    module.exports = {};
  }
});

// ../Cubiverse/src/scene.js
import * as THREE3 from "../../vendor/three.module.js";

// ../Cubiverse/node_modules/three/examples/jsm/controls/OrbitControls.js
import {
  Controls,
  MOUSE,
  Quaternion,
  Spherical,
  TOUCH,
  Vector2,
  Vector3,
  Plane,
  Ray,
  MathUtils
} from "../../vendor/three.module.js";
var _changeEvent = { type: "change" };
var _startEvent = { type: "start" };
var _endEvent = { type: "end" };
var _ray = new Ray();
var _plane = new Plane();
var _TILT_LIMIT = Math.cos(70 * MathUtils.DEG2RAD);
var _v = new Vector3();
var _twoPI = 2 * Math.PI;
var _STATE = {
  NONE: -1,
  ROTATE: 0,
  DOLLY: 1,
  PAN: 2,
  TOUCH_ROTATE: 3,
  TOUCH_PAN: 4,
  TOUCH_DOLLY_PAN: 5,
  TOUCH_DOLLY_ROTATE: 6
};
var _EPS = 1e-6;
var OrbitControls = class extends Controls {
  /**
   * Constructs a new controls instance.
   *
   * @param {Object3D} object - The object that is managed by the controls.
   * @param {?HTMLDOMElement} domElement - The HTML element used for event listeners.
   */
  constructor(object, domElement = null) {
    super(object, domElement);
    this.state = _STATE.NONE;
    this.target = new Vector3();
    this.cursor = new Vector3();
    this.minDistance = 0;
    this.maxDistance = Infinity;
    this.minZoom = 0;
    this.maxZoom = Infinity;
    this.minTargetRadius = 0;
    this.maxTargetRadius = Infinity;
    this.minPolarAngle = 0;
    this.maxPolarAngle = Math.PI;
    this.minAzimuthAngle = -Infinity;
    this.maxAzimuthAngle = Infinity;
    this.enableDamping = false;
    this.dampingFactor = 0.05;
    this.enableZoom = true;
    this.zoomSpeed = 1;
    this.enableRotate = true;
    this.rotateSpeed = 1;
    this.keyRotateSpeed = 1;
    this.enablePan = true;
    this.panSpeed = 1;
    this.screenSpacePanning = true;
    this.keyPanSpeed = 7;
    this.zoomToCursor = false;
    this.autoRotate = false;
    this.autoRotateSpeed = 2;
    this.keys = { LEFT: "ArrowLeft", UP: "ArrowUp", RIGHT: "ArrowRight", BOTTOM: "ArrowDown" };
    this.mouseButtons = { LEFT: MOUSE.ROTATE, MIDDLE: MOUSE.DOLLY, RIGHT: MOUSE.PAN };
    this.touches = { ONE: TOUCH.ROTATE, TWO: TOUCH.DOLLY_PAN };
    this.target0 = this.target.clone();
    this.position0 = this.object.position.clone();
    this.zoom0 = this.object.zoom;
    this._domElementKeyEvents = null;
    this._lastPosition = new Vector3();
    this._lastQuaternion = new Quaternion();
    this._lastTargetPosition = new Vector3();
    this._quat = new Quaternion().setFromUnitVectors(object.up, new Vector3(0, 1, 0));
    this._quatInverse = this._quat.clone().invert();
    this._spherical = new Spherical();
    this._sphericalDelta = new Spherical();
    this._scale = 1;
    this._panOffset = new Vector3();
    this._rotateStart = new Vector2();
    this._rotateEnd = new Vector2();
    this._rotateDelta = new Vector2();
    this._panStart = new Vector2();
    this._panEnd = new Vector2();
    this._panDelta = new Vector2();
    this._dollyStart = new Vector2();
    this._dollyEnd = new Vector2();
    this._dollyDelta = new Vector2();
    this._dollyDirection = new Vector3();
    this._mouse = new Vector2();
    this._performCursorZoom = false;
    this._pointers = [];
    this._pointerPositions = {};
    this._controlActive = false;
    this._onPointerMove = onPointerMove.bind(this);
    this._onPointerDown = onPointerDown.bind(this);
    this._onPointerUp = onPointerUp.bind(this);
    this._onContextMenu = onContextMenu.bind(this);
    this._onMouseWheel = onMouseWheel.bind(this);
    this._onKeyDown = onKeyDown.bind(this);
    this._onTouchStart = onTouchStart.bind(this);
    this._onTouchMove = onTouchMove.bind(this);
    this._onMouseDown = onMouseDown.bind(this);
    this._onMouseMove = onMouseMove.bind(this);
    this._interceptControlDown = interceptControlDown.bind(this);
    this._interceptControlUp = interceptControlUp.bind(this);
    if (this.domElement !== null) {
      this.connect(this.domElement);
    }
    this.update();
  }
  connect(element) {
    super.connect(element);
    this.domElement.addEventListener("pointerdown", this._onPointerDown);
    this.domElement.addEventListener("pointercancel", this._onPointerUp);
    this.domElement.addEventListener("contextmenu", this._onContextMenu);
    this.domElement.addEventListener("wheel", this._onMouseWheel, { passive: false });
    const document2 = this.domElement.getRootNode();
    document2.addEventListener("keydown", this._interceptControlDown, { passive: true, capture: true });
    this.domElement.style.touchAction = "none";
  }
  disconnect() {
    this.domElement.removeEventListener("pointerdown", this._onPointerDown);
    this.domElement.removeEventListener("pointermove", this._onPointerMove);
    this.domElement.removeEventListener("pointerup", this._onPointerUp);
    this.domElement.removeEventListener("pointercancel", this._onPointerUp);
    this.domElement.removeEventListener("wheel", this._onMouseWheel);
    this.domElement.removeEventListener("contextmenu", this._onContextMenu);
    this.stopListenToKeyEvents();
    const document2 = this.domElement.getRootNode();
    document2.removeEventListener("keydown", this._interceptControlDown, { capture: true });
    this.domElement.style.touchAction = "auto";
  }
  dispose() {
    this.disconnect();
  }
  /**
   * Get the current vertical rotation, in radians.
   *
   * @return {number} The current vertical rotation, in radians.
   */
  getPolarAngle() {
    return this._spherical.phi;
  }
  /**
   * Get the current horizontal rotation, in radians.
   *
   * @return {number} The current horizontal rotation, in radians.
   */
  getAzimuthalAngle() {
    return this._spherical.theta;
  }
  /**
   * Returns the distance from the camera to the target.
   *
   * @return {number} The distance from the camera to the target.
   */
  getDistance() {
    return this.object.position.distanceTo(this.target);
  }
  /**
   * Adds key event listeners to the given DOM element.
   * `window` is a recommended argument for using this method.
   *
   * @param {HTMLDOMElement} domElement - The DOM element
   */
  listenToKeyEvents(domElement) {
    domElement.addEventListener("keydown", this._onKeyDown);
    this._domElementKeyEvents = domElement;
  }
  /**
   * Removes the key event listener previously defined with `listenToKeyEvents()`.
   */
  stopListenToKeyEvents() {
    if (this._domElementKeyEvents !== null) {
      this._domElementKeyEvents.removeEventListener("keydown", this._onKeyDown);
      this._domElementKeyEvents = null;
    }
  }
  /**
   * Save the current state of the controls. This can later be recovered with `reset()`.
   */
  saveState() {
    this.target0.copy(this.target);
    this.position0.copy(this.object.position);
    this.zoom0 = this.object.zoom;
  }
  /**
   * Reset the controls to their state from either the last time the `saveState()`
   * was called, or the initial state.
   */
  reset() {
    this.target.copy(this.target0);
    this.object.position.copy(this.position0);
    this.object.zoom = this.zoom0;
    this.object.updateProjectionMatrix();
    this.dispatchEvent(_changeEvent);
    this.update();
    this.state = _STATE.NONE;
  }
  update(deltaTime = null) {
    const position = this.object.position;
    _v.copy(position).sub(this.target);
    _v.applyQuaternion(this._quat);
    this._spherical.setFromVector3(_v);
    if (this.autoRotate && this.state === _STATE.NONE) {
      this._rotateLeft(this._getAutoRotationAngle(deltaTime));
    }
    if (this.enableDamping) {
      this._spherical.theta += this._sphericalDelta.theta * this.dampingFactor;
      this._spherical.phi += this._sphericalDelta.phi * this.dampingFactor;
    } else {
      this._spherical.theta += this._sphericalDelta.theta;
      this._spherical.phi += this._sphericalDelta.phi;
    }
    let min = this.minAzimuthAngle;
    let max = this.maxAzimuthAngle;
    if (isFinite(min) && isFinite(max)) {
      if (min < -Math.PI) min += _twoPI;
      else if (min > Math.PI) min -= _twoPI;
      if (max < -Math.PI) max += _twoPI;
      else if (max > Math.PI) max -= _twoPI;
      if (min <= max) {
        this._spherical.theta = Math.max(min, Math.min(max, this._spherical.theta));
      } else {
        this._spherical.theta = this._spherical.theta > (min + max) / 2 ? Math.max(min, this._spherical.theta) : Math.min(max, this._spherical.theta);
      }
    }
    this._spherical.phi = Math.max(this.minPolarAngle, Math.min(this.maxPolarAngle, this._spherical.phi));
    this._spherical.makeSafe();
    if (this.enableDamping === true) {
      this.target.addScaledVector(this._panOffset, this.dampingFactor);
    } else {
      this.target.add(this._panOffset);
    }
    this.target.sub(this.cursor);
    this.target.clampLength(this.minTargetRadius, this.maxTargetRadius);
    this.target.add(this.cursor);
    let zoomChanged = false;
    if (this.zoomToCursor && this._performCursorZoom || this.object.isOrthographicCamera) {
      this._spherical.radius = this._clampDistance(this._spherical.radius);
    } else {
      const prevRadius = this._spherical.radius;
      this._spherical.radius = this._clampDistance(this._spherical.radius * this._scale);
      zoomChanged = prevRadius != this._spherical.radius;
    }
    _v.setFromSpherical(this._spherical);
    _v.applyQuaternion(this._quatInverse);
    position.copy(this.target).add(_v);
    this.object.lookAt(this.target);
    if (this.enableDamping === true) {
      this._sphericalDelta.theta *= 1 - this.dampingFactor;
      this._sphericalDelta.phi *= 1 - this.dampingFactor;
      this._panOffset.multiplyScalar(1 - this.dampingFactor);
    } else {
      this._sphericalDelta.set(0, 0, 0);
      this._panOffset.set(0, 0, 0);
    }
    if (this.zoomToCursor && this._performCursorZoom) {
      let newRadius = null;
      if (this.object.isPerspectiveCamera) {
        const prevRadius = _v.length();
        newRadius = this._clampDistance(prevRadius * this._scale);
        const radiusDelta = prevRadius - newRadius;
        this.object.position.addScaledVector(this._dollyDirection, radiusDelta);
        this.object.updateMatrixWorld();
        zoomChanged = !!radiusDelta;
      } else if (this.object.isOrthographicCamera) {
        const mouseBefore = new Vector3(this._mouse.x, this._mouse.y, 0);
        mouseBefore.unproject(this.object);
        const prevZoom = this.object.zoom;
        this.object.zoom = Math.max(this.minZoom, Math.min(this.maxZoom, this.object.zoom / this._scale));
        this.object.updateProjectionMatrix();
        zoomChanged = prevZoom !== this.object.zoom;
        const mouseAfter = new Vector3(this._mouse.x, this._mouse.y, 0);
        mouseAfter.unproject(this.object);
        this.object.position.sub(mouseAfter).add(mouseBefore);
        this.object.updateMatrixWorld();
        newRadius = _v.length();
      } else {
        console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled.");
        this.zoomToCursor = false;
      }
      if (newRadius !== null) {
        if (this.screenSpacePanning) {
          this.target.set(0, 0, -1).transformDirection(this.object.matrix).multiplyScalar(newRadius).add(this.object.position);
        } else {
          _ray.origin.copy(this.object.position);
          _ray.direction.set(0, 0, -1).transformDirection(this.object.matrix);
          if (Math.abs(this.object.up.dot(_ray.direction)) < _TILT_LIMIT) {
            this.object.lookAt(this.target);
          } else {
            _plane.setFromNormalAndCoplanarPoint(this.object.up, this.target);
            _ray.intersectPlane(_plane, this.target);
          }
        }
      }
    } else if (this.object.isOrthographicCamera) {
      const prevZoom = this.object.zoom;
      this.object.zoom = Math.max(this.minZoom, Math.min(this.maxZoom, this.object.zoom / this._scale));
      if (prevZoom !== this.object.zoom) {
        this.object.updateProjectionMatrix();
        zoomChanged = true;
      }
    }
    this._scale = 1;
    this._performCursorZoom = false;
    if (zoomChanged || this._lastPosition.distanceToSquared(this.object.position) > _EPS || 8 * (1 - this._lastQuaternion.dot(this.object.quaternion)) > _EPS || this._lastTargetPosition.distanceToSquared(this.target) > _EPS) {
      this.dispatchEvent(_changeEvent);
      this._lastPosition.copy(this.object.position);
      this._lastQuaternion.copy(this.object.quaternion);
      this._lastTargetPosition.copy(this.target);
      return true;
    }
    return false;
  }
  _getAutoRotationAngle(deltaTime) {
    if (deltaTime !== null) {
      return _twoPI / 60 * this.autoRotateSpeed * deltaTime;
    } else {
      return _twoPI / 60 / 60 * this.autoRotateSpeed;
    }
  }
  _getZoomScale(delta) {
    const normalizedDelta = Math.abs(delta * 0.01);
    return Math.pow(0.95, this.zoomSpeed * normalizedDelta);
  }
  _rotateLeft(angle) {
    this._sphericalDelta.theta -= angle;
  }
  _rotateUp(angle) {
    this._sphericalDelta.phi -= angle;
  }
  _panLeft(distance, objectMatrix) {
    _v.setFromMatrixColumn(objectMatrix, 0);
    _v.multiplyScalar(-distance);
    this._panOffset.add(_v);
  }
  _panUp(distance, objectMatrix) {
    if (this.screenSpacePanning === true) {
      _v.setFromMatrixColumn(objectMatrix, 1);
    } else {
      _v.setFromMatrixColumn(objectMatrix, 0);
      _v.crossVectors(this.object.up, _v);
    }
    _v.multiplyScalar(distance);
    this._panOffset.add(_v);
  }
  // deltaX and deltaY are in pixels; right and down are positive
  _pan(deltaX, deltaY) {
    const element = this.domElement;
    if (this.object.isPerspectiveCamera) {
      const position = this.object.position;
      _v.copy(position).sub(this.target);
      let targetDistance = _v.length();
      targetDistance *= Math.tan(this.object.fov / 2 * Math.PI / 180);
      this._panLeft(2 * deltaX * targetDistance / element.clientHeight, this.object.matrix);
      this._panUp(2 * deltaY * targetDistance / element.clientHeight, this.object.matrix);
    } else if (this.object.isOrthographicCamera) {
      this._panLeft(deltaX * (this.object.right - this.object.left) / this.object.zoom / element.clientWidth, this.object.matrix);
      this._panUp(deltaY * (this.object.top - this.object.bottom) / this.object.zoom / element.clientHeight, this.object.matrix);
    } else {
      console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled.");
      this.enablePan = false;
    }
  }
  _dollyOut(dollyScale) {
    if (this.object.isPerspectiveCamera || this.object.isOrthographicCamera) {
      this._scale /= dollyScale;
    } else {
      console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled.");
      this.enableZoom = false;
    }
  }
  _dollyIn(dollyScale) {
    if (this.object.isPerspectiveCamera || this.object.isOrthographicCamera) {
      this._scale *= dollyScale;
    } else {
      console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled.");
      this.enableZoom = false;
    }
  }
  _updateZoomParameters(x, y) {
    if (!this.zoomToCursor) {
      return;
    }
    this._performCursorZoom = true;
    const rect = this.domElement.getBoundingClientRect();
    const dx = x - rect.left;
    const dy = y - rect.top;
    const w = rect.width;
    const h = rect.height;
    this._mouse.x = dx / w * 2 - 1;
    this._mouse.y = -(dy / h) * 2 + 1;
    this._dollyDirection.set(this._mouse.x, this._mouse.y, 1).unproject(this.object).sub(this.object.position).normalize();
  }
  _clampDistance(dist) {
    return Math.max(this.minDistance, Math.min(this.maxDistance, dist));
  }
  //
  // event callbacks - update the object state
  //
  _handleMouseDownRotate(event) {
    this._rotateStart.set(event.clientX, event.clientY);
  }
  _handleMouseDownDolly(event) {
    this._updateZoomParameters(event.clientX, event.clientX);
    this._dollyStart.set(event.clientX, event.clientY);
  }
  _handleMouseDownPan(event) {
    this._panStart.set(event.clientX, event.clientY);
  }
  _handleMouseMoveRotate(event) {
    this._rotateEnd.set(event.clientX, event.clientY);
    this._rotateDelta.subVectors(this._rotateEnd, this._rotateStart).multiplyScalar(this.rotateSpeed);
    const element = this.domElement;
    this._rotateLeft(_twoPI * this._rotateDelta.x / element.clientHeight);
    this._rotateUp(_twoPI * this._rotateDelta.y / element.clientHeight);
    this._rotateStart.copy(this._rotateEnd);
    this.update();
  }
  _handleMouseMoveDolly(event) {
    this._dollyEnd.set(event.clientX, event.clientY);
    this._dollyDelta.subVectors(this._dollyEnd, this._dollyStart);
    if (this._dollyDelta.y > 0) {
      this._dollyOut(this._getZoomScale(this._dollyDelta.y));
    } else if (this._dollyDelta.y < 0) {
      this._dollyIn(this._getZoomScale(this._dollyDelta.y));
    }
    this._dollyStart.copy(this._dollyEnd);
    this.update();
  }
  _handleMouseMovePan(event) {
    this._panEnd.set(event.clientX, event.clientY);
    this._panDelta.subVectors(this._panEnd, this._panStart).multiplyScalar(this.panSpeed);
    this._pan(this._panDelta.x, this._panDelta.y);
    this._panStart.copy(this._panEnd);
    this.update();
  }
  _handleMouseWheel(event) {
    this._updateZoomParameters(event.clientX, event.clientY);
    if (event.deltaY < 0) {
      this._dollyIn(this._getZoomScale(event.deltaY));
    } else if (event.deltaY > 0) {
      this._dollyOut(this._getZoomScale(event.deltaY));
    }
    this.update();
  }
  _handleKeyDown(event) {
    let needsUpdate = false;
    switch (event.code) {
      case this.keys.UP:
        if (event.ctrlKey || event.metaKey || event.shiftKey) {
          if (this.enableRotate) {
            this._rotateUp(_twoPI * this.keyRotateSpeed / this.domElement.clientHeight);
          }
        } else {
          if (this.enablePan) {
            this._pan(0, this.keyPanSpeed);
          }
        }
        needsUpdate = true;
        break;
      case this.keys.BOTTOM:
        if (event.ctrlKey || event.metaKey || event.shiftKey) {
          if (this.enableRotate) {
            this._rotateUp(-_twoPI * this.keyRotateSpeed / this.domElement.clientHeight);
          }
        } else {
          if (this.enablePan) {
            this._pan(0, -this.keyPanSpeed);
          }
        }
        needsUpdate = true;
        break;
      case this.keys.LEFT:
        if (event.ctrlKey || event.metaKey || event.shiftKey) {
          if (this.enableRotate) {
            this._rotateLeft(_twoPI * this.keyRotateSpeed / this.domElement.clientHeight);
          }
        } else {
          if (this.enablePan) {
            this._pan(this.keyPanSpeed, 0);
          }
        }
        needsUpdate = true;
        break;
      case this.keys.RIGHT:
        if (event.ctrlKey || event.metaKey || event.shiftKey) {
          if (this.enableRotate) {
            this._rotateLeft(-_twoPI * this.keyRotateSpeed / this.domElement.clientHeight);
          }
        } else {
          if (this.enablePan) {
            this._pan(-this.keyPanSpeed, 0);
          }
        }
        needsUpdate = true;
        break;
    }
    if (needsUpdate) {
      event.preventDefault();
      this.update();
    }
  }
  _handleTouchStartRotate(event) {
    if (this._pointers.length === 1) {
      this._rotateStart.set(event.pageX, event.pageY);
    } else {
      const position = this._getSecondPointerPosition(event);
      const x = 0.5 * (event.pageX + position.x);
      const y = 0.5 * (event.pageY + position.y);
      this._rotateStart.set(x, y);
    }
  }
  _handleTouchStartPan(event) {
    if (this._pointers.length === 1) {
      this._panStart.set(event.pageX, event.pageY);
    } else {
      const position = this._getSecondPointerPosition(event);
      const x = 0.5 * (event.pageX + position.x);
      const y = 0.5 * (event.pageY + position.y);
      this._panStart.set(x, y);
    }
  }
  _handleTouchStartDolly(event) {
    const position = this._getSecondPointerPosition(event);
    const dx = event.pageX - position.x;
    const dy = event.pageY - position.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    this._dollyStart.set(0, distance);
  }
  _handleTouchStartDollyPan(event) {
    if (this.enableZoom) this._handleTouchStartDolly(event);
    if (this.enablePan) this._handleTouchStartPan(event);
  }
  _handleTouchStartDollyRotate(event) {
    if (this.enableZoom) this._handleTouchStartDolly(event);
    if (this.enableRotate) this._handleTouchStartRotate(event);
  }
  _handleTouchMoveRotate(event) {
    if (this._pointers.length == 1) {
      this._rotateEnd.set(event.pageX, event.pageY);
    } else {
      const position = this._getSecondPointerPosition(event);
      const x = 0.5 * (event.pageX + position.x);
      const y = 0.5 * (event.pageY + position.y);
      this._rotateEnd.set(x, y);
    }
    this._rotateDelta.subVectors(this._rotateEnd, this._rotateStart).multiplyScalar(this.rotateSpeed);
    const element = this.domElement;
    this._rotateLeft(_twoPI * this._rotateDelta.x / element.clientHeight);
    this._rotateUp(_twoPI * this._rotateDelta.y / element.clientHeight);
    this._rotateStart.copy(this._rotateEnd);
  }
  _handleTouchMovePan(event) {
    if (this._pointers.length === 1) {
      this._panEnd.set(event.pageX, event.pageY);
    } else {
      const position = this._getSecondPointerPosition(event);
      const x = 0.5 * (event.pageX + position.x);
      const y = 0.5 * (event.pageY + position.y);
      this._panEnd.set(x, y);
    }
    this._panDelta.subVectors(this._panEnd, this._panStart).multiplyScalar(this.panSpeed);
    this._pan(this._panDelta.x, this._panDelta.y);
    this._panStart.copy(this._panEnd);
  }
  _handleTouchMoveDolly(event) {
    const position = this._getSecondPointerPosition(event);
    const dx = event.pageX - position.x;
    const dy = event.pageY - position.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    this._dollyEnd.set(0, distance);
    this._dollyDelta.set(0, Math.pow(this._dollyEnd.y / this._dollyStart.y, this.zoomSpeed));
    this._dollyOut(this._dollyDelta.y);
    this._dollyStart.copy(this._dollyEnd);
    const centerX = (event.pageX + position.x) * 0.5;
    const centerY = (event.pageY + position.y) * 0.5;
    this._updateZoomParameters(centerX, centerY);
  }
  _handleTouchMoveDollyPan(event) {
    if (this.enableZoom) this._handleTouchMoveDolly(event);
    if (this.enablePan) this._handleTouchMovePan(event);
  }
  _handleTouchMoveDollyRotate(event) {
    if (this.enableZoom) this._handleTouchMoveDolly(event);
    if (this.enableRotate) this._handleTouchMoveRotate(event);
  }
  // pointers
  _addPointer(event) {
    this._pointers.push(event.pointerId);
  }
  _removePointer(event) {
    delete this._pointerPositions[event.pointerId];
    for (let i = 0; i < this._pointers.length; i++) {
      if (this._pointers[i] == event.pointerId) {
        this._pointers.splice(i, 1);
        return;
      }
    }
  }
  _isTrackingPointer(event) {
    for (let i = 0; i < this._pointers.length; i++) {
      if (this._pointers[i] == event.pointerId) return true;
    }
    return false;
  }
  _trackPointer(event) {
    let position = this._pointerPositions[event.pointerId];
    if (position === void 0) {
      position = new Vector2();
      this._pointerPositions[event.pointerId] = position;
    }
    position.set(event.pageX, event.pageY);
  }
  _getSecondPointerPosition(event) {
    const pointerId = event.pointerId === this._pointers[0] ? this._pointers[1] : this._pointers[0];
    return this._pointerPositions[pointerId];
  }
  //
  _customWheelEvent(event) {
    const mode = event.deltaMode;
    const newEvent = {
      clientX: event.clientX,
      clientY: event.clientY,
      deltaY: event.deltaY
    };
    switch (mode) {
      case 1:
        newEvent.deltaY *= 16;
        break;
      case 2:
        newEvent.deltaY *= 100;
        break;
    }
    if (event.ctrlKey && !this._controlActive) {
      newEvent.deltaY *= 10;
    }
    return newEvent;
  }
};
function onPointerDown(event) {
  if (this.enabled === false) return;
  if (this._pointers.length === 0) {
    this.domElement.setPointerCapture(event.pointerId);
    this.domElement.addEventListener("pointermove", this._onPointerMove);
    this.domElement.addEventListener("pointerup", this._onPointerUp);
  }
  if (this._isTrackingPointer(event)) return;
  this._addPointer(event);
  if (event.pointerType === "touch") {
    this._onTouchStart(event);
  } else {
    this._onMouseDown(event);
  }
}
function onPointerMove(event) {
  if (this.enabled === false) return;
  if (event.pointerType === "touch") {
    this._onTouchMove(event);
  } else {
    this._onMouseMove(event);
  }
}
function onPointerUp(event) {
  this._removePointer(event);
  switch (this._pointers.length) {
    case 0:
      this.domElement.releasePointerCapture(event.pointerId);
      this.domElement.removeEventListener("pointermove", this._onPointerMove);
      this.domElement.removeEventListener("pointerup", this._onPointerUp);
      this.dispatchEvent(_endEvent);
      this.state = _STATE.NONE;
      break;
    case 1:
      const pointerId = this._pointers[0];
      const position = this._pointerPositions[pointerId];
      this._onTouchStart({ pointerId, pageX: position.x, pageY: position.y });
      break;
  }
}
function onMouseDown(event) {
  let mouseAction;
  switch (event.button) {
    case 0:
      mouseAction = this.mouseButtons.LEFT;
      break;
    case 1:
      mouseAction = this.mouseButtons.MIDDLE;
      break;
    case 2:
      mouseAction = this.mouseButtons.RIGHT;
      break;
    default:
      mouseAction = -1;
  }
  switch (mouseAction) {
    case MOUSE.DOLLY:
      if (this.enableZoom === false) return;
      this._handleMouseDownDolly(event);
      this.state = _STATE.DOLLY;
      break;
    case MOUSE.ROTATE:
      if (event.ctrlKey || event.metaKey || event.shiftKey) {
        if (this.enablePan === false) return;
        this._handleMouseDownPan(event);
        this.state = _STATE.PAN;
      } else {
        if (this.enableRotate === false) return;
        this._handleMouseDownRotate(event);
        this.state = _STATE.ROTATE;
      }
      break;
    case MOUSE.PAN:
      if (event.ctrlKey || event.metaKey || event.shiftKey) {
        if (this.enableRotate === false) return;
        this._handleMouseDownRotate(event);
        this.state = _STATE.ROTATE;
      } else {
        if (this.enablePan === false) return;
        this._handleMouseDownPan(event);
        this.state = _STATE.PAN;
      }
      break;
    default:
      this.state = _STATE.NONE;
  }
  if (this.state !== _STATE.NONE) {
    this.dispatchEvent(_startEvent);
  }
}
function onMouseMove(event) {
  switch (this.state) {
    case _STATE.ROTATE:
      if (this.enableRotate === false) return;
      this._handleMouseMoveRotate(event);
      break;
    case _STATE.DOLLY:
      if (this.enableZoom === false) return;
      this._handleMouseMoveDolly(event);
      break;
    case _STATE.PAN:
      if (this.enablePan === false) return;
      this._handleMouseMovePan(event);
      break;
  }
}
function onMouseWheel(event) {
  if (this.enabled === false || this.enableZoom === false || this.state !== _STATE.NONE) return;
  event.preventDefault();
  this.dispatchEvent(_startEvent);
  this._handleMouseWheel(this._customWheelEvent(event));
  this.dispatchEvent(_endEvent);
}
function onKeyDown(event) {
  if (this.enabled === false) return;
  this._handleKeyDown(event);
}
function onTouchStart(event) {
  this._trackPointer(event);
  switch (this._pointers.length) {
    case 1:
      switch (this.touches.ONE) {
        case TOUCH.ROTATE:
          if (this.enableRotate === false) return;
          this._handleTouchStartRotate(event);
          this.state = _STATE.TOUCH_ROTATE;
          break;
        case TOUCH.PAN:
          if (this.enablePan === false) return;
          this._handleTouchStartPan(event);
          this.state = _STATE.TOUCH_PAN;
          break;
        default:
          this.state = _STATE.NONE;
      }
      break;
    case 2:
      switch (this.touches.TWO) {
        case TOUCH.DOLLY_PAN:
          if (this.enableZoom === false && this.enablePan === false) return;
          this._handleTouchStartDollyPan(event);
          this.state = _STATE.TOUCH_DOLLY_PAN;
          break;
        case TOUCH.DOLLY_ROTATE:
          if (this.enableZoom === false && this.enableRotate === false) return;
          this._handleTouchStartDollyRotate(event);
          this.state = _STATE.TOUCH_DOLLY_ROTATE;
          break;
        default:
          this.state = _STATE.NONE;
      }
      break;
    default:
      this.state = _STATE.NONE;
  }
  if (this.state !== _STATE.NONE) {
    this.dispatchEvent(_startEvent);
  }
}
function onTouchMove(event) {
  this._trackPointer(event);
  switch (this.state) {
    case _STATE.TOUCH_ROTATE:
      if (this.enableRotate === false) return;
      this._handleTouchMoveRotate(event);
      this.update();
      break;
    case _STATE.TOUCH_PAN:
      if (this.enablePan === false) return;
      this._handleTouchMovePan(event);
      this.update();
      break;
    case _STATE.TOUCH_DOLLY_PAN:
      if (this.enableZoom === false && this.enablePan === false) return;
      this._handleTouchMoveDollyPan(event);
      this.update();
      break;
    case _STATE.TOUCH_DOLLY_ROTATE:
      if (this.enableZoom === false && this.enableRotate === false) return;
      this._handleTouchMoveDollyRotate(event);
      this.update();
      break;
    default:
      this.state = _STATE.NONE;
  }
}
function onContextMenu(event) {
  if (this.enabled === false) return;
  event.preventDefault();
}
function interceptControlDown(event) {
  if (event.key === "Control") {
    this._controlActive = true;
    const document2 = this.domElement.getRootNode();
    document2.addEventListener("keyup", this._interceptControlUp, { passive: true, capture: true });
  }
}
function interceptControlUp(event) {
  if (event.key === "Control") {
    this._controlActive = false;
    const document2 = this.domElement.getRootNode();
    document2.removeEventListener("keyup", this._interceptControlUp, { passive: true, capture: true });
  }
}

// ../Cubiverse/src/spatial.js
var SPATIAL_BASES = Object.freeze({
  xy: { right: [1, 0, 0], up: [0, 1, 0], normal: [0, 0, 1] },
  xz: { right: [1, 0, 0], up: [0, 0, -1], normal: [0, 1, 0] },
  yz: { right: [0, 0, -1], up: [0, 1, 0], normal: [1, 0, 0] }
});
function spatialBasis(plane = "xy") {
  const basis = SPATIAL_BASES[plane] || SPATIAL_BASES.xy;
  return Object.fromEntries(Object.entries(basis).map(([key2, value]) => [key2, [...value]]));
}
function spatialDirection(key2, plane = "xy") {
  const { right, up } = typeof plane === "string" ? spatialBasis(plane) : plane;
  const negate2 = (vector) => vector.map((value) => value === 0 ? 0 : -value);
  switch (String(key2).toLowerCase()) {
    case "arrowleft":
      return negate2(right);
    case "arrowright":
      return right;
    case "arrowup":
      return up;
    case "arrowdown":
      return negate2(up);
    default:
      return null;
  }
}
var dot = (a, b) => a.reduce((sum, n, i) => sum + n * b[i], 0);
var cross = (a, b) => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
var axes = [[1, 0, 0], [-1, 0, 0], [0, 1, 0], [0, -1, 0], [0, 0, 1], [0, 0, -1]];
var CUBE_BASES = axes.flatMap((right) => axes.filter((up) => dot(right, up) === 0).map((up) => ({ right, up, normal: cross(right, up).map((n) => n || 0) })));
function closestCubeBasis({ right, up, normal }, previous = null, hysteresis = 0.12) {
  const score = (b) => dot(b.right, right) + dot(b.up, up) + dot(b.normal, normal);
  const best = CUBE_BASES.reduce((a, b) => score(a) >= score(b) ? a : b);
  const chosen = previous && score(best) < score(previous) + hysteresis ? previous : best;
  return Object.fromEntries(Object.entries(chosen).map(([key2, v]) => [key2, [...v]]));
}
function cubeTurnForKey(key2) {
  return { w: "up", s: "down", a: "left", d: "right" }[String(key2).toLowerCase()] || null;
}
function spatialCameraPose({ plane = "xy", target = [0, 0, 0], distance = 20, aspect = 1 } = {}) {
  const { normal, up } = spatialBasis(plane);
  const radius = Math.max(3, distance) * Math.max(1, 0.92 / Math.max(0.01, aspect));
  return { target: [...target], position: target.map((value, i) => value + normal[i] * radius), up };
}

// ../Cubiverse/src/cube-labels.js
import * as THREE from "../../vendor/three.module.js";
var TILE = 64;
var MAX_COLUMNS = 32;
var PAGE_GLYPHS = MAX_COLUMNS * MAX_COLUMNS;
var powerOfTwo = (n) => 2 ** Math.ceil(Math.log2(Math.max(1, n)));
var defaultFont = '"Segoe UI", Arial, sans-serif';
var CubeLabels = class {
  constructor(parent, boxGeometry) {
    this.parent = parent;
    this.boxGeometry = boxGeometry;
    this.batches = /* @__PURE__ */ new Map();
    this.glyphs = /* @__PURE__ */ new Map();
    this.transform = new THREE.Object3D();
    this.color = new THREE.Color();
  }
  makeMesh(material, capacity) {
    const geometry = this.boxGeometry.clone();
    geometry.setAttribute("cubeAtlasRect", new THREE.InstancedBufferAttribute(new Float32Array(capacity * 4), 4).setUsage(THREE.DynamicDrawUsage));
    const mesh = new THREE.InstancedMesh(geometry, material, capacity);
    mesh.name = "cube-labels";
    mesh.count = 0;
    mesh.visible = false;
    mesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
    mesh.userData.cubeLabels = true;
    mesh.userData.atlasGeometry = geometry;
    mesh.renderOrder = 1;
    this.parent.add(mesh);
    return mesh;
  }
  makeBatch(glyphs, page) {
    const columns = Math.min(MAX_COLUMNS, powerOfTwo(Math.ceil(Math.sqrt(glyphs.length)))), side = columns * TILE;
    const canvas = document.createElement("canvas");
    canvas.width = side;
    canvas.height = side;
    const draw = canvas.getContext("2d");
    if (!draw) throw new Error("Cannot create cube label atlas.");
    draw.clearRect(0, 0, side, side);
    draw.fillStyle = "#ffffff";
    draw.textAlign = "center";
    draw.textBaseline = "alphabetic";
    glyphs.forEach((glyph, slot) => {
      const col = slot % columns, row = Math.floor(slot / columns), cx = col * TILE + TILE / 2, cy = row * TILE + TILE / 2;
      let fontSize = 44;
      draw.font = `650 ${fontSize}px ${glyph.fontFamily}`;
      let measure = draw.measureText(glyph.text);
      if (measure.width > TILE - 10) {
        fontSize *= (TILE - 10) / measure.width;
        draw.font = `650 ${fontSize}px ${glyph.fontFamily}`;
        measure = draw.measureText(glyph.text);
      }
      const ascent = measure.actualBoundingBoxAscent ?? fontSize * 0.72, descent = measure.actualBoundingBoxDescent ?? fontSize * 0.04, left = measure.actualBoundingBoxLeft ?? measure.width / 2, right = measure.actualBoundingBoxRight ?? measure.width / 2;
      draw.fillText(glyph.text, cx + (left - right) / 2, cy + (ascent - descent) / 2);
      glyph.page = page;
      glyph.rect = [col / columns, 1 - (row + 1) / columns, 1 / columns, 1 / columns];
    });
    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.generateMipmaps = false;
    texture.minFilter = THREE.LinearFilter;
    texture.magFilter = THREE.LinearFilter;
    const material = new THREE.MeshBasicMaterial({ map: texture, transparent: true, alphaTest: 0.08, depthTest: true, depthWrite: true, toneMapped: false, side: THREE.FrontSide });
    material.onBeforeCompile = (shader) => {
      shader.vertexShader = "attribute vec4 cubeAtlasRect;\n" + shader.vertexShader;
      shader.vertexShader = shader.vertexShader.replace("#include <uv_vertex>", "#include <uv_vertex>\n#ifdef USE_MAP\nvMapUv = vMapUv * cubeAtlasRect.zw + cubeAtlasRect.xy;\n#endif");
    };
    material.customProgramCacheKey = () => "cubiverse-cube-atlas-v1";
    return { texture, material, mesh: this.makeMesh(material, 4), columns, glyphs };
  }
  releaseBatches() {
    for (const { mesh, material, texture } of this.batches.values()) {
      this.parent.remove(mesh);
      mesh.dispose();
      mesh.userData.atlasGeometry.dispose();
      material.dispose();
      texture.dispose();
    }
    this.batches.clear();
  }
  rebuild() {
    this.releaseBatches();
    const glyphs = [...this.glyphs.values()];
    for (let start = 0; start < glyphs.length; start += PAGE_GLYPHS) {
      const page = start / PAGE_GLYPHS;
      this.batches.set(page, this.makeBatch(glyphs.slice(start, start + PAGE_GLYPHS), page));
    }
  }
  set(labels2) {
    const valid = [];
    let added = false;
    for (const label of labels2) {
      if (!label.cube) continue;
      const text2 = String(label.text ?? "");
      if (!text2) continue;
      const position = [label.x ?? 0, label.y ?? 0, label.z ?? 0], dimensions = [label.sx ?? 0.9, label.sy ?? 0.9, label.sz ?? 0.9];
      if (!position.every(Number.isFinite) || !dimensions.every((v) => Number.isFinite(v) && v > 0)) continue;
      const fontFamily = String(label.fontFamily ?? defaultFont), key2 = JSON.stringify([text2, fontFamily]);
      if (!this.glyphs.has(key2)) {
        this.glyphs.set(key2, { text: text2, fontFamily });
        added = true;
      }
      valid.push({ glyph: this.glyphs.get(key2), position, dimensions, color: label.color ?? "#17212b", data: label.data, quaternion: label.quaternion });
    }
    if (added) this.rebuild();
    const groups = /* @__PURE__ */ new Map();
    for (const label of valid) {
      if (!groups.has(label.glyph.page)) groups.set(label.glyph.page, []);
      groups.get(label.glyph.page).push(label);
    }
    for (const [page, batch] of this.batches) {
      const cells = groups.get(page) ?? [];
      if (batch.mesh.instanceMatrix.count < cells.length) {
        const old = batch.mesh;
        this.parent.remove(old);
        old.dispose();
        old.userData.atlasGeometry.dispose();
        batch.mesh = this.makeMesh(batch.material, powerOfTwo(cells.length));
      }
      const mesh = batch.mesh;
      mesh.count = cells.length;
      mesh.visible = Boolean(cells.length);
      mesh.userData.sliceCells = cells.map((cell) => cell.data);
      const rects = mesh.geometry.getAttribute("cubeAtlasRect");
      cells.forEach((cell, index) => {
        this.transform.position.set(...cell.position);
        this.transform.scale.set(...cell.dimensions);
        if (cell.quaternion) this.transform.quaternion.fromArray(cell.quaternion);
        else this.transform.quaternion.identity();
        this.transform.updateMatrix();
        mesh.setMatrixAt(index, this.transform.matrix);
        mesh.setColorAt(index, this.color.set(cell.color));
        rects.setXYZW(index, ...cell.glyph.rect);
      });
      mesh.instanceMatrix.needsUpdate = true;
      rects.needsUpdate = true;
      if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
      if (cells.length) {
        mesh.computeBoundingBox();
        mesh.computeBoundingSphere();
      } else {
        mesh.boundingBox?.makeEmpty();
        mesh.boundingSphere?.makeEmpty();
      }
    }
  }
  clear() {
    this.releaseBatches();
    this.glyphs.clear();
  }
};

// ../Cubiverse/src/slice-renderer.js
import * as THREE2 from "../../vendor/three.module.js";
var SliceRenderer = class {
  constructor() {
    this.records = /* @__PURE__ */ new Map();
  }
  record(object) {
    let entry = this.records.get(object);
    if (entry && object.material === entry.material) return entry;
    if (entry && object.material === entry.original) {
      object.material = entry.material;
      return entry;
    }
    if (entry) {
      entry.material.dispose();
      if (entry.attribute) {
        object.geometry.dispose();
        object.geometry = entry.geometry;
      }
      this.records.delete(object);
    }
    const original = object.material;
    if (!original || Array.isArray(original)) return null;
    const material = original.clone();
    entry = { original, material, geometry: object.geometry, opacity: original.opacity, depthWrite: original.depthWrite, transparent: original.transparent };
    if (object.isInstancedMesh) {
      object.geometry = object.geometry.clone();
      const count = object.instanceMatrix.count;
      const attr = new THREE2.InstancedBufferAttribute(new Float32Array(count).fill(1), 1);
      attr.setUsage(THREE2.DynamicDrawUsage);
      object.geometry.setAttribute("v11SliceAlpha", attr);
      entry.attribute = attr;
      const previous = original.onBeforeCompile;
      material.onBeforeCompile = (shader, renderer) => {
        previous?.call(original, shader, renderer);
        shader.vertexShader = "attribute float v11SliceAlpha; varying float v11Alpha;\n" + shader.vertexShader;
        shader.vertexShader = shader.vertexShader.replace("#include <begin_vertex>", "#include <begin_vertex>\nv11Alpha = v11SliceAlpha;");
        shader.fragmentShader = "varying float v11Alpha;\n" + shader.fragmentShader;
        shader.fragmentShader = shader.fragmentShader.replace("#include <alphatest_fragment>", "diffuseColor.a *= v11Alpha;\n#include <alphatest_fragment>");
      };
      material.customProgramCacheKey = () => `v11-slice-${original.type}-${original.customProgramCacheKey()}`;
    }
    object.material = material;
    this.records.set(object, entry);
    return entry;
  }
  update(world, state, cellPosition) {
    const active = Boolean(state?.mode);
    for (const [object, entry] of this.records) if (!object.parent) {
      if (object.material === entry.material) object.material = entry.original;
      entry.material.dispose();
      if (entry.attribute) {
        object.geometry.dispose();
        object.geometry = entry.geometry;
      }
      this.records.delete(object);
    }
    world.traverse((object) => {
      if (!object.material) return;
      const info = object.userData;
      const data = info.pickData ?? info.sliceData;
      const cells = info.pickCells ?? info.sliceCells ?? info.cells?.map((item) => item.data);
      if (!cells && data == null) return;
      if (!active && !this.records.has(object)) return;
      const entry = this.record(object);
      if (!entry) return;
      const material = entry.material;
      if (material.transparent !== (active || entry.transparent)) {
        material.transparent = active || entry.transparent;
        material.needsUpdate = true;
      }
      material.depthWrite = active ? false : entry.depthWrite;
      material.alphaTest = active ? 1e-3 : entry.original.alphaTest;
      if (entry.attribute) {
        material.opacity = active && !info.pickOnly ? Math.max(entry.opacity, 0.45) : entry.opacity;
        for (let i = 0; i < object.count; i++) entry.attribute.array[i] = !active || state.contains(cellPosition?.(cells?.[i])) ? 1 : 0.035;
        entry.attribute.needsUpdate = true;
      } else material.opacity = (active ? Math.max(entry.opacity, 0.45) : entry.opacity) * (!active || state.contains(cellPosition?.(data)) ? 1 : 0.035);
      if (info.pickOnly) material.colorWrite = false;
    });
  }
  clear() {
    for (const [object, entry] of this.records) {
      if (object.material === entry.material) object.material = entry.original;
      entry.material.dispose();
      if (entry.attribute) {
        object.geometry.dispose();
        object.geometry = entry.geometry;
      }
    }
    this.records.clear();
  }
};

// ../Cubiverse/src/scene.js
var Playground = class {
  constructor(container) {
    this.container = container;
    this.motionPreference = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    this.renderer = new THREE3.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    this.renderer.outputColorSpace = THREE3.SRGBColorSpace;
    this.renderer.info.autoReset = false;
    this.renderer.setClearColor(0, 0);
    this.renderer.domElement.tabIndex = 0;
    this.renderer.domElement.setAttribute("aria-label", "3D game. Right drag to orbit, left click to play, X to slice, Z to restore.");
    container.append(this.renderer.domElement);
    this.scene = new THREE3.Scene();
    this.world = new THREE3.Group();
    this.group = new THREE3.Group();
    this.voxelGroup = new THREE3.Group();
    this.labelGroup = new THREE3.Group();
    this.world.add(this.group, this.voxelGroup, this.labelGroup);
    this.scene.add(this.world);
    this.scene.add(new THREE3.HemisphereLight(16777215, 7108240, 2.3));
    const sun = new THREE3.DirectionalLight(16777215, 2.4);
    sun.position.set(-8, 16, 12);
    this.scene.add(sun);
    const fill = new THREE3.DirectionalLight(15200255, 0.8);
    fill.position.set(10, 1, -8);
    this.scene.add(fill);
    this.camera = new THREE3.PerspectiveCamera(40, 1, 0.1, 1200);
    this.navigationCamera = new THREE3.PerspectiveCamera(38, 1, 0.1, 1200);
    this.navigationEnabled = false;
    this.navigationCenter = new THREE3.Vector3();
    this.navigationRadius = 12;
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.configurePointerControls();
    this.sliceRenderer = new SliceRenderer();
    this.sliceState = null;
    this.cellPosition = null;
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.09;
    this.controls.minDistance = 3;
    this.controls.maxDistance = 180;
    this.controls.maxPolarAngle = Math.PI * 0.91;
    this.controls.enablePan = true;
    this.boxGeometry = new THREE3.BoxGeometry(1, 1, 1);
    this.cubeLabels = new CubeLabels(this.world, this.boxGeometry);
    this.meshes = /* @__PURE__ */ new Map();
    this.voxelBounds = new THREE3.Box3();
    this.textures = /* @__PURE__ */ new Map();
    this.dummy = new THREE3.Object3D();
    this.color = new THREE3.Color();
    this.raycaster = new THREE3.Raycaster();
    this.pointer = new THREE3.Vector2();
    this.frameSettings = { target: [0, 0, 0], distance: 20 };
    this.spatialPlane = "xy";
    this.spatialActive = false;
    this.spatialIsOverview = false;
    this.cameraTween = null;
    this.cubeBasis = null;
    this.pickCycle = null;
    this.resizeObserver = new ResizeObserver(() => this.resize());
    this.resizeObserver.observe(container);
    this.frame(this.frameSettings);
  }
  resize() {
    const { width, height } = this.container.getBoundingClientRect();
    if (width < 1 || height < 1) return;
    this.renderer.setSize(width, height);
    this.navigationWidth = Math.round(Math.min(180, width * 0.28));
    this.navigationHeight = Math.round(this.navigationWidth * 0.88);
    this.navigationCamera.aspect = this.navigationWidth / this.navigationHeight;
    this.navigationCamera.updateProjectionMatrix();
    this.container.parentElement.style.setProperty("--navigation-width", this.navigationWidth + "px");
    this.container.parentElement.style.setProperty("--navigation-height", this.navigationHeight + "px");
    const previousAspect = this.camera.aspect;
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    if (this.controls && !this.firstPerson && !this.chaseActive && Math.abs(previousAspect - this.camera.aspect) > 0.02) {
      const offset = this.camera.position.clone().sub(this.controls.target);
      const previousFit = Math.max(1, 1.05 / previousAspect), nextFit = Math.max(1, 1.05 / this.camera.aspect);
      this.camera.position.copy(this.controls.target).add(offset.multiplyScalar(nextFit / previousFit));
      this.controls.update();
      this.fitToBounds();
    }
  }
  quality(ratio) {
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, Number(ratio)));
    this.resize();
  }
  configurePointerControls() {
    this.controls.mouseButtons = { LEFT: null, MIDDLE: THREE3.MOUSE.PAN, RIGHT: THREE3.MOUSE.ROTATE };
    this.controls.touches = { ONE: null, TWO: THREE3.TOUCH.DOLLY_ROTATE };
  }
  setSlice(state, cellPosition) {
    this.sliceState = state;
    this.cellPosition = cellPosition;
  }
  firstPersonSpatial({ position = [0, 0, 0], forward = [0, 0, -1], up = [0, 1, 0], fov = 78, near = 0.035 } = {}) {
    this.firstPerson = true;
    this.chaseActive = false;
    this.cameraTween = null;
    this.spatialActive = true;
    this.spatialIsOverview = false;
    this.controls.enabled = false;
    if (this.camera.fov !== fov || this.camera.near !== near) {
      this.camera.fov = fov;
      this.camera.near = near;
      this.camera.updateProjectionMatrix();
    }
    this.camera.position.fromArray(position);
    this.camera.up.fromArray(up).normalize();
    this.controls.target.copy(this.camera.position).add(new THREE3.Vector3(...forward).normalize());
    this.camera.lookAt(this.controls.target);
    this.camera.updateMatrixWorld(true);
    this.cubeBasis = null;
    this.updateCubeBasis();
  }
  lookFirstPerson(dx, dy) {
    if (!this.firstPerson) return;
    const rotation = new THREE3.Quaternion().setFromEuler(new THREE3.Euler(-dy * 4e-3, -dx * 4e-3, 0, "YXZ"));
    this.camera.quaternion.multiply(rotation).normalize();
    const forward = new THREE3.Vector3(0, 0, -1).applyQuaternion(this.camera.quaternion);
    this.camera.up.set(0, 1, 0).applyQuaternion(this.camera.quaternion);
    this.controls.target.copy(this.camera.position).add(forward);
    this.camera.updateMatrixWorld(true);
    this.updateCubeBasis();
  }
  faceSpatial({ normal = [0, 0, 1], up = [0, 1, 0], target = [0, 0, 0], distance = 20 } = {}) {
    this.cameraTween = null;
    this.spatialActive = true;
    distance *= Math.max(1, 1.05 / this.camera.aspect);
    this.camera.far = Math.max(1200, distance * 20);
    this.camera.updateProjectionMatrix();
    const point2 = new THREE3.Vector3(...target), outward = new THREE3.Vector3(...normal).normalize();
    this.controls.target.copy(point2);
    this.camera.position.copy(point2).add(outward.multiplyScalar(distance));
    this.camera.up.fromArray(up);
    this.camera.lookAt(point2);
    this.resetOrbitUp(this.camera.up.clone());
    this.cubeBasis = null;
    this.updateCubeBasis();
  }
  setVoxels(items) {
    this.voxelBounds.makeEmpty();
    const batches = /* @__PURE__ */ new Map();
    for (const item of items) {
      const opacity = Math.round((item.opacity ?? 1) * 100) / 100;
      if (opacity <= 0) continue;
      const half = [(item.sx ?? 0.9) / 2, (item.sy ?? 0.9) / 2, (item.sz ?? 0.9) / 2];
      this.voxelBounds.expandByPoint(new THREE3.Vector3((item.x ?? 0) - half[0], (item.y ?? 0) - half[1], (item.z ?? 0) - half[2]));
      this.voxelBounds.expandByPoint(new THREE3.Vector3((item.x ?? 0) + half[0], (item.y ?? 0) + half[1], (item.z ?? 0) + half[2]));
      if (!batches.has(opacity)) batches.set(opacity, []);
      batches.get(opacity).push(item);
    }
    for (const [opacity, mesh] of this.meshes) if (!batches.has(opacity)) {
      mesh.count = 0;
      mesh.visible = false;
    }
    for (const [opacity, cells] of batches) {
      let mesh = this.meshes.get(opacity);
      if (!mesh || mesh.instanceMatrix.count < cells.length) {
        if (mesh) {
          this.voxelGroup.remove(mesh);
          mesh.material.dispose();
          mesh.dispose();
        }
        const capacity = 2 ** Math.ceil(Math.log2(Math.max(16, cells.length)));
        const material = new THREE3.MeshStandardMaterial({ roughness: 0.72, metalness: 0.03, transparent: opacity < 1, opacity, depthWrite: opacity >= 1 });
        mesh = new THREE3.InstancedMesh(this.boxGeometry, material, capacity);
        mesh.instanceMatrix.setUsage(THREE3.DynamicDrawUsage);
        mesh.frustumCulled = false;
        this.meshes.set(opacity, mesh);
        this.voxelGroup.add(mesh);
      }
      mesh.visible = true;
      mesh.count = cells.length;
      mesh.userData.cells = cells;
      mesh.userData.pickOnly = cells.every((item) => item.pickOnly);
      mesh.material.colorWrite = !mesh.userData.pickOnly;
      for (let i = 0; i < cells.length; i++) {
        const cell = cells[i];
        this.dummy.position.set(cell.x ?? 0, cell.y ?? 0, cell.z ?? 0);
        this.dummy.scale.set(cell.sx ?? 0.9, cell.sy ?? 0.9, cell.sz ?? 0.9);
        if (cell.quaternion) this.dummy.quaternion.fromArray(cell.quaternion);
        else this.dummy.quaternion.identity();
        this.dummy.updateMatrix();
        mesh.setMatrixAt(i, this.dummy.matrix);
        mesh.setColorAt(i, this.color.set(cell.color ?? "#ffffff"));
      }
      mesh.instanceMatrix.needsUpdate = true;
      if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
      mesh.computeBoundingSphere();
    }
  }
  setLabels(labels2) {
    this.cubeLabels.set(labels2);
    labels2 = labels2.filter((label) => !label.cube);
    while (this.labelGroup.children.length > labels2.length) {
      const sprite = this.labelGroup.children.at(-1);
      this.labelGroup.remove(sprite);
    }
    labels2.forEach((label, i) => {
      const key2 = `${label.text}|${label.color || "#17212b"}`;
      let material = this.textures.get(key2);
      if (!material) {
        const canvas = document.createElement("canvas");
        const text2 = String(label.text);
        canvas.width = Math.max(128, Math.min(1024, text2.length * 52));
        canvas.height = 128;
        const draw = canvas.getContext("2d");
        draw.font = '600 80px system-ui, "Microsoft JhengHei", sans-serif';
        draw.textAlign = "center";
        draw.textBaseline = "middle";
        draw.fillStyle = label.color || "#17212b";
        draw.fillText(text2, canvas.width / 2, 66, canvas.width - 10);
        const map = new THREE3.CanvasTexture(canvas);
        map.colorSpace = THREE3.SRGBColorSpace;
        material = new THREE3.SpriteMaterial({ map, transparent: true, depthWrite: false, depthTest: false, toneMapped: false });
        material.userData.aspect = canvas.width / canvas.height;
        this.textures.set(key2, material);
      }
      let sprite = this.labelGroup.children[i];
      if (!sprite) {
        sprite = new THREE3.Sprite(material);
        this.labelGroup.add(sprite);
      }
      sprite.material = material;
      sprite.userData.sliceData = label.data;
      sprite.userData.float = label.float || 0;
      sprite.userData.floatPhase = label.floatPhase || 0;
      sprite.userData.baseY = label.y;
      sprite.position.set(label.x, label.y, label.z);
      const size = label.size ?? 0.5;
      sprite.scale.set(size * material.userData.aspect, size, 1);
      sprite.renderOrder = 10;
    });
  }
  frame(settings) {
    this.cancelAssist();
    this.world?.quaternion.identity();
    this.world?.position.set(0, 0, 0);
    this.firstPerson = false;
    this.chaseActive = false;
    this.controls.enabled = true;
    this.camera.fov = 40;
    this.camera.near = 0.1;
    this.cameraTween = null;
    this.spatialActive = false;
    this.controls.enableRotate = true;
    this.controls.enablePan = true;
    this.controls.enableDamping = true;
    this.camera.up.set(0, 1, 0);
    this.resetOrbitUp(this.camera.up);
    this.frameSettings = { ...settings, target: settings.target || [0, 0, 0] };
    const target = new THREE3.Vector3(...this.frameSettings.target);
    const distance = settings.distance || 20;
    this.camera.far = Math.max(1200, distance * 20);
    this.camera.updateProjectionMatrix();
    this.controls.maxDistance = Math.max(180, distance * 20);
    let offset = settings.position ? new THREE3.Vector3(...settings.position).sub(target) : new THREE3.Vector3(0.85, 0.95, 1.2).normalize().multiplyScalar(distance);
    offset.multiplyScalar(Math.max(1, 1.05 / this.camera.aspect));
    this.camera.position.copy(target).add(offset);
    this.controls.target.copy(target);
    this.camera.lookAt(target);
    this.controls.update();
    this.fitToBounds();
    this.controls.saveState();
  }
  fitToBounds() {
    if (!this.voxelBounds) return;
    this.world.updateMatrixWorld(true);
    const bounds = this.frameSettings?.size ? new THREE3.Box3().setFromCenterAndSize(new THREE3.Vector3(...this.frameSettings.target), new THREE3.Vector3(...this.frameSettings.size)) : this.voxelBounds.clone();
    if (!this.frameSettings?.size && this.group.children.length) bounds.union(new THREE3.Box3().setFromObject(this.group));
    if (bounds.isEmpty()) return;
    const corners = [];
    for (const x of [bounds.min.x, bounds.max.x]) for (const y of [bounds.min.y, bounds.max.y]) for (const z of [bounds.min.z, bounds.max.z]) {
      const point2 = new THREE3.Vector3(x, y, z);
      if (this.frameSettings?.size) point2.applyMatrix4(this.world.matrixWorld);
      corners.push(point2);
    }
    for (let attempt = 0; attempt < 5; attempt++) {
      this.camera.updateMatrixWorld(true);
      let factor = 0;
      for (const corner of corners) {
        const p = corner.clone().project(this.camera);
        factor = Math.max(factor, Math.abs(p.x) / 0.94, Math.abs(p.y) / 0.94);
      }
      if (Math.abs(factor - 1) < 0.025) break;
      const offset = this.camera.position.clone().sub(this.controls.target).multiplyScalar(Math.max(0.45, Math.min(factor, 3)));
      this.camera.position.copy(this.controls.target).add(offset);
      this.controls.update();
    }
  }
  view(direction) {
    if (this.spatialActive) {
      this.viewCube(direction);
      return;
    }
    const target = this.controls.target.clone();
    const distance = this.frameSettings.distance || 20;
    if (direction === "iso") {
      this.frame({ ...this.frameSettings, position: void 0 });
      return;
    }
    const vector = direction === "top" ? new THREE3.Vector3(0, 1, 1e-3) : new THREE3.Vector3(0, 1e-3, 1);
    this.camera.position.copy(target).add(vector.normalize().multiplyScalar(distance));
    this.camera.lookAt(target);
    this.controls.update();
    this.fitToBounds();
  }
  focusSpatial({ plane = this.spatialPlane, target = [0, 0, 0], distance = 20, animate = true } = {}) {
    const pose = spatialCameraPose({ plane, target, distance, aspect: 1 });
    this.frame({ target, distance, position: pose.position });
    this.camera.up.fromArray(pose.up);
    this.resetOrbitUp(this.camera.up.clone());
    this.spatialIsOverview = false;
  }
  overviewSpatial({ target = [0, 0, 0], distance = 24 } = {}) {
    if (!this.spatialActive) this.volumeSpatial({ target, distance });
    else this.viewCube("iso");
  }
  resetOrbitUp(up) {
    const target = this.controls.target.clone();
    this.controls.dispose();
    this.camera.up.copy(up);
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.configurePointerControls();
    this.controls.target.copy(target);
    this.controls.enableDamping = false;
    this.controls.enablePan = true;
    this.controls.minDistance = 3;
    this.controls.maxDistance = Math.max(180, this.camera.position.distanceTo(target) * 20);
    this.controls.minPolarAngle = 1e-3;
    this.controls.maxPolarAngle = Math.PI - 1e-3;
    this.controls.update();
  }
  volumeSpatial({ target = [0, 0, 0], distance = 20, size } = {}) {
    this.frame({ target, distance, size });
    this.spatialActive = true;
    this.spatialIsOverview = true;
    this.navigationEnabled = false;
    this.volumeCenter = new THREE3.Vector3(...target);
    this.volumeSize = size;
    this.cubeBasis = null;
    this.updateCubeBasis();
    this.pickCycle = null;
  }
  chaseSpatial({ position = [0, 0, 0], forward = [0, 0, -1], up = [0, 1, 0], dt = 1 / 60, transition = 0, distance = 2.8, height = 2, side = 0, fov = 58 } = {}) {
    const entering = !this.chaseActive;
    this.chaseActive = true;
    this.firstPerson = false;
    this.cameraTween = null;
    this.spatialActive = true;
    this.spatialIsOverview = false;
    this.controls.enabled = false;
    const p = new THREE3.Vector3(...position), f = new THREE3.Vector3(...forward).normalize(), u = new THREE3.Vector3(...up).normalize(), r = new THREE3.Vector3().crossVectors(f, u).normalize();
    const pull = Math.max(0, Math.min(1, transition));
    const eye = p.clone().addScaledVector(f, -distance).addScaledVector(u, height).addScaledVector(r, side);
    const look = p.clone().addScaledVector(f, 0.8 + 0.35 * pull);
    const alpha = entering || this.motionPreference?.matches ? 1 : 1 - Math.exp(-Math.max(1e-3, dt) * 7);
    this.camera.position.lerp(eye, alpha);
    this.controls.target.lerp(look, alpha);
    const proxy = this.chaseProxy ?? (this.chaseProxy = new THREE3.PerspectiveCamera());
    proxy.position.copy(this.camera.position);
    proxy.up.copy(u);
    proxy.lookAt(this.controls.target);
    this.camera.quaternion.slerp(proxy.quaternion, entering || this.motionPreference?.matches ? 1 : 1 - Math.exp(-Math.max(1e-3, dt) * 9));
    this.camera.up.set(0, 1, 0).applyQuaternion(this.camera.quaternion);
    this.camera.fov = THREE3.MathUtils.lerp(this.camera.fov, fov, alpha);
    this.camera.near = 0.04;
    this.camera.updateProjectionMatrix();
    this.camera.updateMatrixWorld(true);
    this.updateCubeBasis();
  }
  followSpatial({ target = [0, 0, 0], weight = 0.3 } = {}) {
    if (!this.spatialActive) return;
    const destination = this.volumeCenter.clone().lerp(new THREE3.Vector3(...target), Math.max(0, Math.min(1, weight)));
    const delta = destination.sub(this.controls.target);
    this.controls.target.add(delta);
    this.camera.position.add(delta);
    this.camera.updateMatrixWorld(true);
  }
  updateCubeBasis() {
    this.camera.updateMatrixWorld(true);
    const quaternion = this.world ? this.world.quaternion.clone().invert().multiply(this.camera.quaternion) : this.camera.quaternion;
    this.cubeBasis = closestCubeBasis({ right: new THREE3.Vector3(1, 0, 0).applyQuaternion(quaternion).toArray(), up: new THREE3.Vector3(0, 1, 0).applyQuaternion(quaternion).toArray(), normal: new THREE3.Vector3(0, 0, 1).applyQuaternion(quaternion).toArray() }, this.cubeBasis);
    const axis = this.cubeBasis.normal.findIndex((n) => n !== 0);
    this.spatialPlane = ["yz", "xz", "xy"][axis];
    return this.cubeBasis;
  }
  vectorForKey(key2) {
    if (this.cameraTween && String(key2).toLowerCase().startsWith("arrow")) this.finishCubeTurn(1);
    return spatialDirection(key2, this.updateCubeBasis());
  }
  turnCube(direction) {
    if (!this.spatialActive) return;
    this.cancelAssist();
    if (this.cameraTween) this.finishCubeTurn(1);
    const basis = this.updateCubeBasis(), vertical = ["up", "down"].includes(direction);
    const axis = new THREE3.Vector3(...vertical ? basis.right : basis.up);
    if (this.world) axis.applyQuaternion(this.world.quaternion);
    const angle = { up: -1, down: 1, left: -1, right: 1 }[direction] * Math.PI / 2;
    if (!Number.isFinite(angle)) return;
    this.cameraTween = { start: performance.now(), duration: 220, axis, angle, offset: this.camera.position.clone().sub(this.controls.target), up: this.camera.up.clone() };
    this.controls.enabled = false;
    if (this.motionPreference?.matches) this.finishCubeTurn(1);
  }
  finishCubeTurn(t) {
    const tween = this.cameraTween;
    if (!tween) return;
    const ease = t * t * (3 - 2 * t), rotation = new THREE3.Quaternion().setFromAxisAngle(tween.axis, tween.angle * ease);
    this.camera.position.copy(this.controls.target).add(tween.offset.clone().applyQuaternion(rotation));
    this.camera.up.copy(tween.up).applyQuaternion(rotation);
    this.camera.lookAt(this.controls.target);
    this.camera.updateMatrixWorld(true);
    if (t >= 1) {
      this.cameraTween = null;
      this.resetOrbitUp(this.camera.up.clone());
      this.cubeBasis = null;
      this.updateCubeBasis();
    }
  }
  viewCube(direction = "iso") {
    if (!this.spatialActive) return;
    this.cancelAssist();
    if (this.firstPerson || this.chaseActive) {
      this.frame(this.frameSettings);
      this.spatialActive = true;
      this.spatialIsOverview = true;
    }
    if (this.cameraTween) this.finishCubeTurn(1);
    const radius = this.camera.position.distanceTo(this.controls.target);
    const positions = { iso: [0.85, 0.95, 1.2], overview: [0.85, 0.95, 1.2], top: [0, 1, 1e-3], xz: [0, 1, 1e-3], front: [0, 1e-3, 1], xy: [0, 1e-3, 1], side: [1, 1e-3, 0], yz: [1, 1e-3, 0] };
    const offset = new THREE3.Vector3(...positions[direction] || positions.iso).normalize().multiplyScalar(radius);
    this.camera.up.set(...["top", "xz"].includes(direction) ? [0, 0, -1] : [0, 1, 0]);
    if (this.world) {
      offset.applyQuaternion(this.world.quaternion);
      this.camera.up.applyQuaternion(this.world.quaternion);
    }
    this.camera.position.copy(this.controls.target).add(offset);
    this.resetOrbitUp(this.camera.up.clone());
    this.fitToBounds();
    this.cubeBasis = null;
    this.updateCubeBasis();
  }
  assistFace({ axis = "z", sign = 1, duration = 850 } = {}) {
    if (!this.spatialActive || this.firstPerson || this.chaseActive || !this.world || !["x", "y", "z"].includes(axis) || ![-1, 1].includes(sign)) return false;
    this.cancelAssist();
    if (this.cameraTween) this.finishCubeTurn(1);
    const normal = new THREE3.Vector3();
    normal[axis] = sign;
    const basis = this.updateCubeBasis();
    let up = new THREE3.Vector3(...basis.up);
    if (Math.abs(up.dot(normal)) > 0.5) {
      up = new THREE3.Vector3(...basis.right);
      if (Math.abs(up.dot(normal)) > 0.5) up = axis === "y" ? new THREE3.Vector3(0, 0, -sign) : new THREE3.Vector3(0, 1, 0);
    }
    const right = new THREE3.Vector3().crossVectors(up, normal).normalize();
    up.crossVectors(normal, right).normalize();
    const localBasis = new THREE3.Quaternion().setFromRotationMatrix(new THREE3.Matrix4().makeBasis(right, up, normal));
    const destination = this.camera.quaternion.clone().multiply(localBasis.invert());
    this.objectTween = { start: performance.now(), duration: Math.max(1, Math.min(1600, duration)), from: this.world.quaternion.clone(), to: destination, pivot: this.volumeCenter?.clone() ?? new THREE3.Vector3(...this.frameSettings.target ?? [0, 0, 0]) };
    this.controls.enabled = false;
    this.pickCycle = null;
    if (this.motionPreference?.matches) this.finishAssist(1);
    return true;
  }
  finishAssist(t) {
    const tween = this.objectTween;
    if (!tween) return;
    const u = Math.max(0, Math.min(1, t)), ease = u * u * u * (u * (u * 6 - 15) + 10);
    this.world.quaternion.slerpQuaternions(tween.from, tween.to, ease);
    this.world.position.copy(tween.pivot).sub(tween.pivot.clone().applyQuaternion(this.world.quaternion));
    this.world.updateMatrixWorld(true);
    this.cubeBasis = null;
    this.updateCubeBasis();
    if (u === 1) {
      this.objectTween = null;
      this.controls.enabled = true;
    }
  }
  cancelAssist() {
    if (!this.objectTween) return;
    this.objectTween = null;
    this.controls.enabled = true;
    this.pickCycle = null;
  }
  pick(clientX, clientY, { cycle = false, remember = true } = {}) {
    const rect = this.renderer.domElement.getBoundingClientRect();
    this.pointer.set((clientX - rect.left) / rect.width * 2 - 1, -(clientY - rect.top) / rect.height * 2 + 1);
    this.scene.updateMatrixWorld(true);
    this.camera.updateMatrixWorld(true);
    this.raycaster.setFromCamera(this.pointer, this.camera);
    const candidates = [...this.meshes.values()].filter((m) => m.visible && m.count);
    this.group.traverse((object) => {
      if (object.isMesh && object.visible && (object.userData.pickCells || object.userData.pickData) && (!object.isInstancedMesh || object.count)) candidates.push(object);
    });
    const hits = this.raycaster.intersectObjects(candidates, false);
    const choices = [], seen = /* @__PURE__ */ new Set();
    for (const hit of hits) {
      let visible = true;
      for (let object = hit.object; object; object = object.parent) if (!object.visible) {
        visible = false;
        break;
      }
      if (!visible) continue;
      const info = hit.object.userData;
      const data = info.pickCells?.[hit.instanceId] ?? info.pickData ?? info.cells?.[hit.instanceId]?.data;
      if (data != null) {
        const pos = this.cellPosition?.(data), id3 = pos ? JSON.stringify(pos) : JSON.stringify(data);
        if (!seen.has(id3)) {
          seen.add(id3);
          choices.push(data);
        }
      }
    }
    if (this.sliceState?.mode && this.sliceState.mode !== "face") choices.sort((a, b) => Number(this.sliceState.contains(this.cellPosition?.(b))) - Number(this.sliceState.contains(this.cellPosition?.(a))));
    const signature = choices.map((data) => JSON.stringify(data)).join("|");
    const previous = this.pickCycle;
    const index = cycle && previous?.signature === signature ? (previous.index + 1) % Math.max(1, choices.length) : 0;
    if (remember) this.pickCycle = { signature, index, x: clientX, y: clientY, choices };
    return choices[index] ?? null;
  }
  clear() {
    this.cancelAssist();
    this.world.quaternion.identity();
    this.world.position.set(0, 0, 0);
    this.firstPerson = false;
    this.chaseActive = false;
    this.controls.enabled = true;
    this.camera.fov = 40;
    this.camera.near = 0.1;
    this.camera.updateProjectionMatrix();
    this.sliceRenderer?.clear();
    this.sliceState = null;
    this.cellPosition = null;
    this.cameraTween = null;
    this.spatialActive = false;
    this.spatialIsOverview = false;
    this.navigationEnabled = false;
    this.controls.enableRotate = true;
    this.controls.enablePan = true;
    this.camera.up.set(0, 1, 0);
    this.group.clear();
    this.cubeLabels.clear();
    this.pickCycle = null;
    this.cubeBasis = null;
    for (const mesh of this.meshes.values()) {
      this.voxelGroup.remove(mesh);
      mesh.material.dispose();
      mesh.dispose();
    }
    this.meshes.clear();
    this.voxelBounds.makeEmpty();
    this.labelGroup.clear();
    for (const material of this.textures.values()) {
      material.map.dispose();
      material.dispose();
    }
    this.textures.clear();
    this.renderer.renderLists.dispose();
  }
  render() {
    if (this.objectTween) this.finishAssist(Math.min(1, (performance.now() - this.objectTween.start) / this.objectTween.duration));
    if (this.cameraTween) {
      this.finishCubeTurn(Math.min(1, (performance.now() - this.cameraTween.start) / this.cameraTween.duration));
    }
    if (!this.objectTween && !this.cameraTween && !this.firstPerson && !this.chaseActive) this.controls.update();
    if (this.spatialActive) this.updateCubeBasis();
    if (this.sliceRenderer) this.sliceRenderer.update(this.world, this.sliceState, this.cellPosition);
    for (const sprite of this.labelGroup.children) if (sprite.userData.float && !this.motionPreference?.matches) sprite.position.y = sprite.userData.baseY + Math.sin(performance.now() * 13e-4 + sprite.userData.floatPhase) * sprite.userData.float;
    this.renderer.info.reset();
    this.renderer.setScissorTest(false);
    const size = this.renderer.getSize(new THREE3.Vector2());
    this.renderer.setViewport(0, 0, size.x, size.y);
    this.renderer.render(this.scene, this.camera);
    if (this.navigationEnabled && this.spatialActive && !this.spatialIsOverview && this.navigationWidth > 40) {
      const width = this.navigationWidth, height = this.navigationHeight, x = size.x - width - 16, y = 59;
      this.navigationCamera.position.copy(this.navigationCenter).add(new THREE3.Vector3(0.9, 0.8, 1.2).normalize().multiplyScalar(this.navigationRadius));
      this.navigationCamera.lookAt(this.navigationCenter);
      this.navigationCamera.updateMatrixWorld(true);
      this.renderer.setScissor(x, y, width, height);
      this.renderer.setScissorTest(true);
      this.renderer.setViewport(x, y, width, height);
      this.renderer.setClearColor(1778484, 0.94);
      this.renderer.clear(true, true, false);
      const labels2 = this.labelGroup.visible;
      this.labelGroup.visible = false;
      this.renderer.render(this.scene, this.navigationCamera);
      this.labelGroup.visible = labels2;
      this.renderer.setScissorTest(false);
      this.renderer.setViewport(0, 0, size.x, size.y);
      this.renderer.setClearColor(0, 0);
    }
  }
  metrics() {
    return { objectRotation: this.world.quaternion.toArray().map((n) => Math.round(n * 1e4) / 1e4), assistTurning: !!this.objectTween, calls: this.renderer.info.render.calls, triangles: this.renderer.info.render.triangles, geometries: this.renderer.info.memory.geometries, textures: this.renderer.info.memory.textures, pixelRatio: this.renderer.getPixelRatio(), fullCube: this.spatialActive, canOrbit: this.controls.enableRotate, cameraBasis: this.cubeBasis, cameraPlane: this.spatialActive ? this.spatialPlane : null, cameraOverview: this.spatialIsOverview, cameraTarget: this.controls.target.toArray().map((n) => Math.round(n * 1e3) / 1e3), cameraPosition: this.camera.position.toArray().map((n) => Math.round(n * 1e3) / 1e3), cameraUp: this.camera.up.toArray().map((n) => Math.round(n * 1e3) / 1e3) };
  }
};

// ../Cubiverse/src/slice-state.js
var coordinate = (value) => Array.isArray(value) ? { x: value[0], y: value[1], z: value[2] } : value;
function depthAxis(basis) {
  const normal = basis?.normal || [0, 0, 1];
  return ["x", "y", "z"][normal.findIndex((n) => Math.abs(n) === Math.max(...normal.map(Math.abs)))];
}
var SliceState = class {
  constructor() {
    this.clear();
    this.lastX = -Infinity;
  }
  clear() {
    this.mode = null;
    this.axis = "z";
    this.index = 0;
    this.center = null;
    this.face = null;
    this.lastX = -Infinity;
  }
  press({ dimensions, basis, selection, game, now = performance.now() }) {
    const center = coordinate(selection) || { x: Math.floor(dimensions.x / 2), y: Math.floor(dimensions.y / 2), z: Math.floor(dimensions.z / 2) };
    const axis = depthAxis(basis), double = game === "minesweeper" && now - this.lastX < 320;
    this.lastX = now;
    if (game === "tictactoe") {
      this.mode = "cell";
      this.center = { x: Math.floor(dimensions.x / 2), y: Math.floor(dimensions.y / 2), z: Math.floor(dimensions.z / 2) };
      return;
    }
    if (double) {
      this.mode = "neighbors";
      this.center = { ...center };
      this.lastX = -Infinity;
      return;
    }
    const n = dimensions[axis], sign = (basis?.normal?.[["x", "y", "z"].indexOf(axis)] || 1) > 0 ? -1 : 1;
    this.index = this.mode === "layer" && this.axis === axis ? (this.index + sign + n) % n : Math.max(0, Math.min(n - 1, center[axis]));
    this.axis = axis;
    this.mode = "layer";
    this.center = { ...center };
  }
  select(position, basis) {
    const p = coordinate(position);
    if (!p || !this.mode) return;
    if (this.mode === "face" && Number.isInteger(p.face)) {
      this.face = p.face;
      this.center = { ...p };
      return;
    }
    this.axis = depthAxis(basis);
    this.index = p[this.axis];
    this.center = { ...p };
    this.mode = "layer";
  }
  contains(position) {
    const p = coordinate(position);
    if (!this.mode || !p) return true;
    if (this.mode === "face") return p.face === this.face;
    if (this.mode === "layer") return p[this.axis] === this.index;
    if (this.mode === "cell") return ["x", "y", "z"].every((axis) => p[axis] === this.center[axis]);
    return ["x", "y", "z"].every((axis) => Math.abs(p[axis] - this.center[axis]) <= 1);
  }
  snapshot() {
    return { mode: this.mode, axis: this.axis, index: this.index, center: this.center && { ...this.center }, ...this.mode === "face" ? { face: this.face } : {} };
  }
};

// ../Cubiverse/src/cover-art.js
var ink = "#34453e";
var line = (d, color = ink, width = 2, extra = "") => `<path d="${d}" fill="none" stroke="${color}" stroke-width="${width}" stroke-linecap="round" stroke-linejoin="round" ${extra}/>`;
var text = (x, y, value, size = 12, color = ink, extra = "") => `<text x="${x}" y="${y}" fill="${color}" ${extra.includes("font-family=") ? "" : 'font-family="Verdana,Arial,sans-serif"'} font-size="${size}" ${extra}>${value}</text>`;
var star = (x, y, s = 5, color = "#e5b466") => `<path d="M${x - s} ${y}Q${x} ${y} ${x} ${y - s}Q${x} ${y} ${x + s} ${y}Q${x} ${y} ${x} ${y + s}Q${x} ${y} ${x - s} ${y}Z" fill="${color}"/>`;
var note = (value, color = "#6c7d72") => text(22, 204, value, 8.5, color, 'letter-spacing="2.1"');
var shadow = (x, y, rx, ry, opacity = 0.1) => `<ellipse cx="${x}" cy="${y}" rx="${rx}" ry="${ry}" fill="${ink}" opacity="${opacity}"/>`;
var cross2 = (x, y, s = 12, color = "#629ad8", width = 7) => line(`M${x - s} ${y - s}L${x + s} ${y + s}M${x + s} ${y - s}L${x - s} ${y + s}`, color, width);
var ring = (x, y, r = 14, color = "#e8767a", width = 7) => `<circle cx="${x}" cy="${y}" r="${r}" fill="none" stroke="${color}" stroke-width="${width}"/>`;
function blockShape(points, color, x, y, size = 19, transform = "") {
  const rectangles = points.map(([u, v]) => `<rect x="${u * size}" y="${v * size}" width="${size - 1}" height="${size - 1}" rx="1.4"/>`).join("");
  return `<g transform="translate(${x} ${y}) ${transform}"><g transform="translate(3 4)" fill="${color}" opacity=".4">${rectangles}</g><g fill="${color}" stroke="white" stroke-opacity=".45" stroke-width="1">${rectangles}</g>${points.map(([u, v]) => line(`M${u * size + 3} ${v * size + size - 4}V${v * size + 3}H${u * size + size - 4}`, "white", 1, 'opacity=".35"')).join("")}</g>`;
}
function tetris() {
  return `${shadow(163, 184, 89, 9, 0.09)}
    <path d="M104 174 131 158 231 158 204 174Z" fill="#bdc9c8"/>
    <path d="M104 174V36L131 21V158Z" fill="#bdc9c8" opacity=".28"/>
    <path d="M204 174V36L231 21V158Z" fill="#bdc9c8" opacity=".14"/>
    ${line("M104 36V174H204V36", "#7b979a", 1.3, 'opacity=".6"')}
    ${line("M131 21V158H231V21", "#7b979a", 1, 'opacity=".25"')}
    ${line("M114 56V119M184 36V71", "#789b9c", 1, 'stroke-dasharray="3 6" opacity=".6"')}
    ${blockShape([[0, 0], [0, 1], [0, 2], [0, 3]], "#62b4c7", 119, 25, 18, "rotate(-7)")}
    ${blockShape([[0, 0], [1, 0], [2, 0], [1, 1]], "#a28cbe", 164, 66, 19, "rotate(8)")}
    ${blockShape([[0, 1], [1, 1], [2, 1], [2, 0]], "#dc9168", 110, 132, 19)}
    ${blockShape([[0, 0], [1, 0], [0, 1], [1, 1]], "#dfbe5f", 170, 132, 19)}
    ${blockShape([[0, 1], [1, 1], [1, 0], [2, 0]], "#8bb28c", 131, 112, 19)}
    ${line("M67 88H88M78 78L88 88 78 98", "#e38a63", 1.5)}
    ${text(247, 146, "+1", 14, "#76958b", 'font-weight="700"')}
    ${note("MAKE ROOM FOR THE NEXT MOVE")}`;
}
function sudoku() {
  const digits = [[0, 0, 8], [2, 0, 2], [4, 0, 6], [1, 1, 7], [3, 1, 3], [5, 1, 1], [0, 2, 4], [4, 2, 5], [1, 3, 9], [3, 3, 8], [5, 3, 2], [0, 4, 3], [2, 4, 5], [4, 4, 7], [1, 5, 6], [5, 5, 4]];
  let grid = "";
  for (let n = 0; n <= 6; n++) grid += line(`M${n * 22} 0V132M0 ${n * 22}H132`, n % 3 ? "#becbc3" : "#738d80", n % 3 ? 0.7 : 1.8);
  return `${shadow(157, 172, 81, 10, 0.08)}<g transform="translate(78 31) rotate(7 66 66) skewX(-9)">
    <rect x="-9" y="-8" width="150" height="151" rx="4" fill="#c7d3ca"/><rect x="-11" y="-12" width="150" height="151" rx="4" fill="#faf8f0"/>
    <rect x="66" y="66" width="22" height="22" fill="#e2ae88" opacity=".25"/>${grid}
    ${digits.map(([x, y, n]) => text(x * 22 + 11, y * 22 + 15, n, 12, "#4c6456", 'text-anchor="middle"')).join("")}</g>
    ${line("M151 88C181 58 212 44 244 60", "#91ae9e", 1, 'stroke-dasharray="2 5"')}
    ${shadow(247, 87, 13, 3, 0.07)}${text(236, 72, "9", 37, "#dd825b", 'font-family="Georgia,serif"')}
    ${text(49, 138, "3", 27, "#6f9b85", 'transform="rotate(-13 49 138)"')}
    ${text(227, 155, "1", 23, "#759ba9", 'transform="rotate(8 227 155)"')}
    ${star(251, 119, 5, "#b8cbbd")}${note("A QUIET SHIFT IN PERSPECTIVE")}`;
}
function ghost(x, y, color, scale = 1) {
  return `<g transform="translate(${x} ${y}) scale(${scale})"><path d="M-13 12V-4A13 13 0 0 1 13-4V12L7 7 0 12-7 7Z" fill="${color}"/><ellipse cx="-5" cy="-4" rx="4" ry="5" fill="#fff8ed"/><ellipse cx="5" cy="-4" rx="4" ry="5" fill="#fff8ed"/><circle cx="-3" cy="-3" r="2" fill="#233951"/><circle cx="7" cy="-3" r="2" fill="#233951"/></g>`;
}
function pacman() {
  const walls = ["M34 48H115V75H159V38H246", "M34 70H91V99H183V62H269V143H239", "M35 163H137V189H215V165H270", "M34 92V142H137V119H182", "M158 144H201V177", "M218 91H247V119"];
  return `<circle cx="215" cy="105" r="61" fill="#1c3449" opacity=".45"/>
    ${walls.map((d) => line(d, "#2b609c", 5) + line(d, "#78a5ce", 1.2, 'opacity=".65"')).join("")}
    ${[121, 143, 165].map((x) => `<circle cx="${x}" cy="123" r="3.1" fill="#f3ddac"/>`).join("")}
    ${shadow(82, 149, 27, 5, 0.35)}<path d="M82 123 105 108A27 27 0 1 0 105 138Z" fill="#f0ca4b"/>
    <path d="M63 111A21 21 0 0 1 81 103" fill="none" stroke="#ffe9a0" stroke-width="3" stroke-linecap="round"/>
    <circle cx="81" cy="105" r="2" fill="#24323d"/>
    <g transform="translate(208 121) rotate(-25)"><ellipse rx="18" ry="29" fill="#091824"/><ellipse rx="18" ry="29" fill="none" stroke="#5aafc0" stroke-width="5"/><ellipse cx="3" rx="13" ry="25" fill="none" stroke="#afd7d9" stroke-width="1.5"/>
    <path d="M-7 10 1 1-7-8M2 10 10 1 2-8" fill="none" stroke="#ead6a2" stroke-width="2" opacity=".8"/></g>
    ${ghost(271, 44, "#e87b89", 0.92)}${ghost(53, 181, "#8bc7c9", 0.66)}
    ${note("THERE IS ANOTHER WAY THROUGH", "#9bb7c7")}`;
}
function numberTile(x, y, n, lift = false) {
  return `<g transform="translate(${x} ${y})">${lift ? '<rect x="3" y="7" width="39" height="39" rx="4" fill="#785b3d" opacity=".25"/>' : ""}<rect y="4" width="39" height="39" rx="4" fill="#b48b5b"/><rect width="39" height="39" rx="4" fill="#e8c995" stroke="#eddbb7" stroke-width="1.4"/><path d="M5 31V5H32" fill="none" stroke="#fff3d7" stroke-width="1.3" opacity=".5"/>${text(19.5, 27, n, 23, "#77543a", 'font-family="Georgia,serif" font-weight="700" text-anchor="middle"')}</g>`;
}
function numpuz() {
  return `${shadow(159, 187, 81, 9, 0.12)}<g transform="translate(83 28) rotate(-8 70 75)">
    <rect x="-10" y="-3" width="151" height="157" rx="10" fill="#ab8356"/><rect x="-10" y="-10" width="151" height="157" rx="10" fill="#ccaa78" stroke="#dec49b" stroke-width="3"/>
    <rect x="-2" y="-2" width="135" height="135" rx="5" fill="#997a56"/>
    ${Array.from({ length: 7 }, (_, i) => numberTile(i % 3 * 44, Math.floor(i / 3) * 44, i + 1)).join("")}
    <rect x="46" y="90" width="37" height="37" rx="3" fill="#80694e" opacity=".55"/>
    ${line("M72 109H58M63 104 58 109 63 114", "#e4c89d", 1.5)}
    ${shadow(108, 112, 18, 5, 0.26)}${numberTile(97, 64, 8, true)}</g>
    ${line("M247 94C266 111 258 141 237 148", "#a88a68", 1.3, 'stroke-dasharray="2 5"')}
    ${star(64, 63, 4, "#c29b68")}${note("ONE EMPTY SPACE. NEW POSSIBILITIES.")}`;
}
function candyDefs() {
  return `<defs>${[["rose", "#f5b3bd", "#df6684"], ["gold", "#f9df8b", "#e2a64a"], ["mint", "#b8d5a2", "#70a27e"], ["blue", "#a5cfe6", "#608ebc"], ["plum", "#d1b5de", "#a07cb6"]].map(([id3, a, b]) => `<linearGradient id="cover-candy-${id3}" x1="0" y1="0" x2=".7" y2="1"><stop stop-color="${a}"/><stop offset="1" stop-color="${b}"/></linearGradient>`).join("")}</defs>`;
}
function candy(x, y, type = "rose", scale = 1, rotation = 0) {
  const shapes = { rose: "M-16-10Q-12-20 0-17Q19-19 19-3Q21 13 8 17Q-9 24-18 10Q-24 1-16-10Z", gold: "M0-22Q21-18 20 1Q18 19 0 22Q-20 18-20-1Q-20-18 0-22Z", mint: "M-19 13Q-21-11 2-20Q24-22 20 2Q15 24-19 13Z", blue: "M-16-16Q0-23 16-16Q23 0 16 16Q0 23-16 16Q-23 0-16-16Z", plum: "M-12-19H12L22 0 12 19H-12L-22 0Z" };
  return `<g transform="translate(${x} ${y}) rotate(${rotation}) scale(${scale})">${shadow(2, 22, 17, 4, 0.1)}<path d="${shapes[type]}" transform="translate(0 3)" fill="${{ rose: "#bf5872", gold: "#b9873d", mint: "#5a876b", blue: "#537ca4", plum: "#8c66a2" }[type]}"/><path d="${shapes[type]}" fill="url(#cover-candy-${type})"/><path d="M-11-7Q-5-15 5-11" fill="none" stroke="#fff9f1" stroke-width="3" stroke-linecap="round" opacity=".68"/>${type === "gold" ? line("M-7 2Q0 10 7 2", "#fff2c1", 2, 'opacity=".5"') : ""}</g>`;
}
function match3() {
  return `${candyDefs()}<path d="M62 149Q74 67 149 60T258 140" fill="none" stroke="#f6ecdf" stroke-width="50" opacity=".5"/>
  <rect x="84" y="87" width="150" height="52" rx="26" fill="#fff0cf" stroke="#e4b963" stroke-width="1.6"/>
  ${candy(71, 65, "gold", 0.86, -27)}${candy(140, 39, "mint", 0.72, 22)}${candy(210, 48, "plum", 0.9, 12)}${candy(268, 96, "blue", 0.83, -16)}
  ${candy(108, 111, "rose", 0.96, -8)}${candy(159, 111, "rose", 0.96, 5)}${candy(210, 111, "rose", 0.96, -6)}
  ${candy(67, 160, "plum", 0.75, -13)}${candy(125, 172, "blue", 0.7, 16)}${candy(225, 168, "mint", 0.86, 22)}
  ${star(92, 82, 6, "#e0b359")}${star(235, 83, 8, "#e0b359")}${star(179, 153, 6, "#edc985")}${star(42, 112, 5, "#d8abc9")}
  ${text(264, 157, "3", 18, "#b58a50", 'font-weight="700" text-anchor="middle"')}${text(276, 149, "+", 11, "#b58a50")}
  ${note("A LITTLE MORE ROOM FOR DELIGHT")}`;
}
function tictactoe() {
  return `<circle cx="157" cy="105" r="86" fill="#243a49" opacity=".6"/>
    <g transform="translate(82 48) rotate(-9 73 65) skewX(-8)">
    ${line("M48 0V137M96 0V137M0 45H144M0 91H144", "#b6c3c2", 3, 'opacity=".8"')}
    ${cross2(24, 22, 11)}${ring(120, 22, 13)}${ring(24, 68, 13)}${cross2(120, 115, 11)}${cross2(72, 115, 11)}
    ${ring(72, 68, 14, "#667981", 3)}</g>
    ${line("M161 104C171 64 201 39 233 31", "#9bb6c4", 1.1, 'stroke-dasharray="2 5"')}
    ${shadow(237, 60, 24, 5, 0.35)}<g transform="translate(237 31) rotate(12)">${cross2(0, 3, 17, "#3d6c9d", 9)}${cross2(0, 0, 17, "#79b6e5", 9)}</g>
    ${ring(246, 162, 17, "#e77c82", 8)}${star(54, 87, 4, "#80a4b7")}
    ${note("YOUR NEXT MOVE HAS ANOTHER ANGLE", "#9cb6c1")}`;
}
function mineTile(x, y, kind = "covered") {
  const covered = kind === "covered" || kind === "flag";
  let inner = "";
  if (covered) inner = `<rect width="34" height="34" fill="#b9bfba"/><path d="M1 33V1H33L29 5H5V29Z" fill="#f1f4ed"/><path d="M1 33H33V1L29 5V29H5Z" fill="#7e8b86"/>`;
  else inner = '<rect width="34" height="34" fill="#d8ded8" stroke="#aeb9b0" stroke-width="1"/>';
  if (kind === "flag") inner += `<path d="M17 9V25M11 25H24" stroke="#46554c" stroke-width="2.3"/><path d="M17 7 7 13 17 16Z" fill="#d96958"/>`;
  else if (kind !== "covered") inner += text(17, 25, kind, 23, kind === 1 ? "#527daf" : kind === 2 ? "#518366" : "#c37161", 'font-weight="700" text-anchor="middle"');
  return `<g transform="translate(${x} ${y})">${inner}</g>`;
}
function minesweeper() {
  const tiles = ["covered", "covered", 1, 1, "covered", "flag", 2, 1, "covered", "covered", "covered", 1];
  return `${shadow(157, 185, 88, 8, 0.1)}<g transform="translate(82 37) rotate(-5 72 70)">
    <rect x="-8" y="-8" width="163" height="153" fill="#aebbb1"/><rect x="-10" y="-11" width="163" height="153" fill="#ccd4cb" stroke="#e8ece3" stroke-width="3"/>
    <rect width="145" height="24" fill="#afbcb1"/><rect x="5" y="3" width="33" height="19" fill="#33443b"/><rect x="107" y="3" width="33" height="19" fill="#33443b"/>
    ${text(8, 18, "007", 14, "#e88967", 'font-family="monospace" letter-spacing=".2"')}${text(110, 18, "018", 14, "#e88967", 'font-family="monospace" letter-spacing=".2"')}
    <circle cx="72" cy="12" r="9" fill="#e3c66f" stroke="#9b966d"/><circle cx="69" cy="10" r="1.1" fill="#54634f"/><circle cx="75" cy="10" r="1.1" fill="#54634f"/>${line("M68 14Q72 18 76 14", "#54634f", 1.3)}
    ${tiles.map((kind, i) => mineTile(i % 4 * 37, 30 + Math.floor(i / 4) * 37, kind)).join("")}</g>
    ${line("M234 54 250 40M244 68H261M224 41V27", "#d3916b", 1.4)}
    <g transform="translate(241 93) rotate(12)">${mineTile(0, 0, "flag")}</g>
    ${line("M245 145Q260 142 258 132", "#829b8d", 1, 'stroke-dasharray="2 4"')}
    ${note("FAMILIAR TILES. DEEPER INSTINCTS.")}`;
}
function connect4() {
  const holes = [];
  for (let row = 0; row < 6; row++) for (let col = 0; col < 7; col++) holes.push(`<circle cx="${12 + col * 23}" cy="${13 + row * 21}" r="8.1"/>`);
  const heights = [1, 2, 3, 4, 2, 1, 2], chips = [];
  for (let col = 0; col < 7; col++) for (let depth = 0; depth < heights[col]; depth++) {
    const row = 5 - depth, color = col < 4 && depth === col ? "#e3c65c" : (col + depth) % 2 ? "#dc7973" : "#e3c65c";
    chips.push(`<circle cx="${12 + col * 23}" cy="${13 + row * 21}" r="7.8" fill="${color}" stroke="${color === "#e3c65c" ? "#c2a146" : "#bd605e"}" stroke-width="1.2"/>`);
  }
  return `<defs><mask id="cover-connect4-holes"><rect width="163" height="132" rx="7" fill="white"/><g fill="black">${holes.join("")}</g></mask></defs>
    ${shadow(160, 184, 91, 8, 0.12)}<g transform="translate(78 34) rotate(-5 82 66)">
    <path d="M0 132 9 139H172V7L163 0V132Z" fill="#386c97"/><rect width="163" height="132" rx="7" fill="#6999bb" mask="url(#cover-connect4-holes)"/>
    <g fill="none" stroke="#447aa2" stroke-width="1.6">${holes.join("")}</g>${chips.join("")}
    <rect x="-8" y="131" width="34" height="7" rx="3" fill="#4a80a6"/><rect x="138" y="131" width="34" height="7" rx="3" fill="#4a80a6"/>
    ${line("M12 118 81 55", "#fbf3c9", 1.3, 'stroke-dasharray="2 4" opacity=".65"')}</g>
    <g transform="translate(254 48) rotate(18)"><ellipse cy="4" rx="16" ry="19" fill="#ba9649"/><ellipse rx="16" ry="19" fill="#e9ca69"/><ellipse cx="-2" cy="-1" rx="11" ry="14" fill="none" stroke="#f8e2a2" stroke-width="1.4"/></g>
    ${line("M257 77Q263 99 243 111", "#9eab8e", 1.2, 'stroke-dasharray="2 5"')}
    ${note("FOUR IN A ROW. FROM ANY SIDE.")}`;
}
var compositions = { tetris, sudoku, pacman, numpuz, match3, tictactoe, minesweeper, connect4 };
var labels = { tetris: "Tetris falling blocks", sudoku: "Sudoku floating numbers", pacman: "Pac-Man maze", numpuz: "Numpuz wooden sliding puzzle", match3: "Match Three animal party", tictactoe: "Tic-Tac-Toe X and O", minesweeper: "Minesweeper classic cells", connect4: "Connect Four colorful pieces" };
function makeCoverArt(id3) {
  const draw = compositions[id3];
  return draw ? `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 220" class="card-art" role="img" aria-label="${labels[id3]}">${draw()}</svg>` : null;
}

// ../Cubiverse/src/catalog.js
function shade(color, factor) {
  const n = parseInt(color.slice(1), 16), rgb = [n >> 16, n >> 8 & 255, n & 255].map((v) => Math.max(0, Math.min(255, Math.round(v * factor))));
  return `rgb(${rgb.join(",")})`;
}
function project([x, y, z], pitch = 18, originY = 112) {
  return [160 + (x - z) * pitch, originY + (x + z) * pitch * 0.46 - y * pitch];
}
function polygon(points, pitch, originY) {
  return points.map((p) => project(p, pitch, originY).join(",")).join(" ");
}
function voxel({ x, y, z, color = "#d9e2ea", edge = 0.84, number = "", opacity = 1 }, pitch = 18, originY = 112) {
  const h = edge / 2, top = [[x - h, y + h, z - h], [x + h, y + h, z - h], [x + h, y + h, z + h], [x - h, y + h, z + h]], left = [[x - h, y + h, z + h], [x + h, y + h, z + h], [x + h, y - h, z + h], [x - h, y - h, z + h]], right = [[x + h, y + h, z - h], [x + h, y + h, z + h], [x + h, y - h, z + h], [x + h, y - h, z - h]];
  const label = number === "" ? "" : [[-0.25, 0.16, 25], [0.25, 0.16, -25]].map(([dx, dy, skew]) => {
    const p = project([x + dx * edge, y - dy * edge, z - dx * edge], pitch, originY);
    return `<text transform="translate(${p.join(" ")}) skewY(${skew})" text-anchor="middle" dominant-baseline="middle" fill="#344154" font-family="system-ui" font-size="${pitch * 0.42}" font-weight="650">${number}</text>`;
  }).join("");
  return `<g opacity="${opacity}"><polygon points="${polygon(top, pitch, originY)}" fill="${shade(color, 1.08)}"/><polygon points="${polygon(left, pitch, originY)}" fill="${color}"/><polygon points="${polygon(right, pitch, originY)}" fill="${shade(color, 0.8)}"/>${label}</g>`;
}
function voxels(cells, pitch, originY = 112) {
  return [...cells].sort((a, b) => a.x + a.z + a.y - b.x - b.z - b.y).map((cell) => voxel(cell, pitch, originY)).join("");
}
function frame(span, pitch, originY = 112, color = "#8199b3", opacity = 0.4, center = [0, 0, 0]) {
  const points = [];
  for (let axis = 0; axis < 3; axis++) for (const a of [-1, 1]) for (const b of [-1, 1]) {
    const p = [...center], q = [...center], other = [0, 1, 2].filter((v) => v !== axis);
    p[axis] -= span / 2;
    q[axis] += span / 2;
    p[other[0]] += a * span / 2;
    q[other[0]] += a * span / 2;
    p[other[1]] += b * span / 2;
    q[other[1]] += b * span / 2;
    points.push(`<path d="M${project(p, pitch, originY).join(" ")}L${project(q, pitch, originY).join(" ")}"/>`);
  }
  return `<g fill="none" stroke="${color}" stroke-width=".9" opacity="${opacity}">${points.join("")}</g>`;
}
function caption(text2, color = "#607185") {
  return `<text x="22" y="205" fill="${color}" font-family="system-ui" font-size="10" letter-spacing="1.4">${text2}</text>`;
}
function illustration(id3) {
  const custom = makeCoverArt(id3);
  if (custom) return custom;
  let inner = "";
  if (id3 === "blokus") {
    const colors = ["#4e83bd", "#dfbb52", "#d97570", "#7fa887"], cells = [], add2 = (points, c) => points.forEach(([x, y, z]) => cells.push({ x: x - 4.5, y: y - 4.5, z: z - 4.5, color: colors[c] }));
    add2([[0, 0, 0], [1, 0, 0], [2, 0, 0], [2, 1, 0], [2, 2, 0]], 0);
    add2([[9, 9, 0], [8, 9, 0], [7, 9, 0], [7, 9, 1], [7, 9, 2]], 1);
    add2([[9, 0, 9], [8, 0, 9], [8, 1, 9], [8, 2, 9]], 2);
    add2([[0, 9, 9], [0, 8, 9], [0, 8, 8], [0, 8, 7]], 3);
    inner = frame(10, 9.4) + voxels(cells, 9.4) + caption("10\xB3 \xB7 21 PIECES \xB7 24 ORIENTATIONS");
  }
  if (id3 === "2048") {
    const cells = [];
    for (let x = 0; x < 4; x++) for (let y = 0; y < 4; y++) for (let z = 0; z < 4; z++) cells.push({ x: x - 1.5, y: y - 1.5, z: z - 1.5, color: "#c5b9ac", edge: 0.85, opacity: 0.14 });
    const tiles = [[0, 0, 0, 2, "#eee4da"], [1, 0, 0, 4, "#ede0c8"], [1, 1, 0, 8, "#f2b179"], [2, 0, 2, 16, "#f59563"], [0, 2, 2, 32, "#f67c5f"], [3, 3, 1, 64, "#f65e3b"]];
    inner = frame(4.2, 22, 112, "#a89580", 0.45) + voxels(cells, 22) + voxels(tiles.map(([x, y, z, number, color]) => ({ x: x - 1.5, y: y - 1.5, z: z - 1.5, number, color, edge: 0.9 })), 22) + caption("4\xB3 \xB7 SIX DIRECTIONS \xB7 MERGE TO 2048");
  }
  return `<svg viewBox="0 0 320 220" class="card-art" role="img" aria-label="${id3} Game preview">${inner}</svg>`;
}
var games = [
  { id: "tetris", name: "Tetris", zh: "Falling blocks", genre: "FALLING BLOCKS / OPEN WELL", color: "#e1e6e6", scene: "#182736", desc: "Find a new angle for every falling piece.", detail: "", source: "https://github.com/jakesgordon/javascript-tetris" },
  { id: "sudoku", name: "Sudoku", zh: "Spatial logic", genre: "LOGIC / FLOATING NUMBERS", color: "#e3e9e6", scene: "#e6ecea", desc: "A quiet little world of numbers.", detail: "", source: "https://github.com/cnkang/sudoku" },
  { id: "pacman", name: "Pac-Man", zh: "Two ways to explore", genre: "ARCADE / INTO THE MAZE", color: "#172431", scene: "#141f2e", desc: "Chase the trail. Or chart your own.", detail: "", source: "https://github.com/bward2/pacman-js" },
  { id: "blokus", name: "BLOKUS", zh: "Corner connections", genre: "STRATEGY / SPATIAL PLAY", color: "#e4e9db", scene: "#e7ecdf", desc: "Small pieces. Unexpected possibilities.", detail: "", source: "https://github.com/Kully/blokus" },
  { id: "numpuz", name: "Numpuz", zh: "One empty space", genre: "SLIDING PUZZLE / ONE EMPTY SPACE", color: "#ece1d0", scene: "#eee5d6", desc: "One little space makes all the difference.", detail: "", source: "https://github.com/krishealty/puzzle" },
  { id: "match3", name: "Match Three", zh: "Animal party", genre: "MATCH THREE / ANIMAL CASCADES", color: "#ede0e6", scene: "#293b49", desc: "Make a match. Start a little mayhem.", detail: "", source: "https://github.com/rembound/Match-3-Game-HTML5" },
  { id: "tictactoe", name: "Tic-Tac-Toe", zh: "Three in a row", origin: "existing", theme: "dark", genre: "STRATEGY / ANOTHER ANGLE", color: "#1b2936", scene: "#17232e", desc: "Your next move has another dimension.", detail: "", source: "" },
  { id: "minesweeper", name: "Minesweeper", zh: "Find the safe path", origin: "existing", genre: "LOGIC / 26 NEIGHBORS", color: "#dfe5e2", scene: "#e5e9e7", desc: "A familiar smile. A deeper mystery.", detail: "", source: "https://pypi.org/project/pygame-minesweeper/" },
  { id: "connect4", name: "Connect Four", zh: "Turn the gravity", origin: "existing", genre: "STRATEGY / TURNING GRAVITY", color: "#dde6ec", scene: "#e3eaf0", desc: "Four in a row, from a whole new angle.", detail: "", source: "https://grantjenks.com/docs/freegames/connect.html" },
  { id: "2048", name: "2048", zh: "Slide and merge", origin: "existing", genre: "NUMBERS / SIX DIRECTIONS", color: "#ece1d2", scene: "#eee6da", desc: "A satisfying little meeting of numbers.", detail: "", source: "https://github.com/rajitbanerjee/2048-pygame" }
].map((g, i) => ({ ...g, index: String(i + 1).padStart(2, "0"), art: illustration(g.id) }));

// ../Cubiverse/src/games/tetris.js
var TETROMINOES = {
  I: { color: "#20d6e8", cells: [[0, 1], [1, 1], [2, 1], [3, 1]], size: 4 },
  J: { color: "#4169ed", cells: [[0, 0], [0, 1], [1, 1], [2, 1]], size: 3 },
  L: { color: "#ff9f30", cells: [[2, 0], [0, 1], [1, 1], [2, 1]], size: 3 },
  O: { color: "#ffdb3b", cells: [[0, 0], [1, 0], [0, 1], [1, 1]], size: 2 },
  S: { color: "#61cf6c", cells: [[1, 0], [2, 0], [0, 1], [1, 1]], size: 3 },
  T: { color: "#b76cf1", cells: [[1, 0], [0, 1], [1, 1], [2, 1]], size: 3 },
  Z: { color: "#f15b6c", cells: [[0, 0], [1, 0], [1, 1], [2, 1]], size: 3 }
};
function rotatedCells(type, rotation = 0) {
  const shape = TETROMINOES[type];
  let cells = shape.cells.map((c) => [...c]);
  if (type === "O") return cells;
  for (let n = 0; n < (rotation % 4 + 4) % 4; n++) cells = cells.map(([x, y]) => [shape.size - 1 - y, x]);
  return cells;
}
var SOURCE_ROTATIONS = {
  I: [3840, 8738, 240, 17476],
  J: [17600, 36352, 25664, 3616],
  L: [17504, 3712, 50240, 11776],
  O: [52224, 52224, 52224, 52224],
  S: [1728, 35904, 27648, 17952],
  T: [3648, 19520, 19968, 17984],
  Z: [3168, 19584, 50688, 9792]
};
var SOURCE_COLORS = { I: "#00ffff", J: "#0000ff", L: "#ffa500", O: "#ffff00", S: "#008000", T: "#800080", Z: "#ff0000" };
function sourceRotatedCells(type, rotation = 0) {
  const mask = SOURCE_ROTATIONS[type][(rotation % 4 + 4) % 4], cells = [];
  for (let i = 0; i < 16; i++) if (mask & 1 << 15 - i) cells.push([i % 4, Math.floor(i / 4)]);
  return cells;
}
function normalizeVoxels(cells) {
  const min = [0, 1, 2].map((axis) => Math.min(...cells.map((c) => c[axis])));
  return cells.map((c) => c.map((v, i) => v - min[i])).sort((a, b) => a[2] - b[2] || a[1] - b[1] || a[0] - b[0]);
}
function rotateVoxels(cells, axis = "z", direction = 1) {
  let result = cells.map((c) => [...c]);
  for (let i = 0; i < (direction % 4 + 4) % 4; i++) result = result.map(([x, y, z]) => axis === "x" ? [x, -z, y] : axis === "y" ? [z, y, -x] : [-y, x, z]);
  return normalizeVoxels(result);
}
function validateTetrisDimensions({ x, y, z }) {
  const dimensions = { x: Number(x), y: Number(y), z: Number(z) };
  if (Object.values(dimensions).some((n) => !Number.isSafeInteger(n) || n < 1)) throw new RangeError("X / Y / Z must be positive integers.");
  if (dimensions.x * dimensions.y * dimensions.z > 32768) throw new RangeError("Maximum 32,768 cells. Reduce one axis.");
  return dimensions;
}
var TetrisEngine = class {
  constructor({ width = 6, height = 20, depth = 6, random = Math.random, rules = "spatial-modern" } = {}) {
    this.rules = rules === "source-classic" ? "source-classic" : "spatial-modern";
    this.isSourceClassic = this.rules === "source-classic";
    const dimensions = this.isSourceClassic ? { x: 10, y: 20, z: 1 } : validateTetrisDimensions({ x: width, y: height, z: depth });
    this.width = dimensions.x;
    this.height = dimensions.y;
    this.depth = dimensions.z;
    this.random = random;
    this.reset();
  }
  reset() {
    this.board = Array.from({ length: this.height }, () => Array.from({ length: this.depth }, () => Array(this.width).fill(null)));
    this.bag = [];
    this.queue = [];
    this.queueSpawns = [];
    this.score = 0;
    this.lines = 0;
    this.level = 1;
    this.gameOver = false;
    this.gravity = 0;
    this.lockTime = 0;
    this.holdType = null;
    this.canHold = true;
    this.lastClear = 0;
    this.lastClearCells = [];
    this.lastClearWaves = 0;
    this.lastClearScore = 0;
    this.fillQueue();
    this.spawn();
  }
  fillQueue() {
    if (this.isSourceClassic) {
      while (this.queue.length < 1) {
        if (!this.bag.length) this.bag = Object.keys(TETROMINOES).flatMap((type2) => Array(4).fill(type2));
        const index = Math.floor(this.random() * Math.max(0, this.bag.length - 1));
        const type = this.bag.splice(index, 1)[0];
        this.queue.push(type);
        this.queueSpawns.push(Math.round(this.random() * (this.width - TETROMINOES[type].size)));
      }
      return;
    }
    while (this.queue.length < 5) {
      if (!this.bag.length) {
        this.bag = Object.keys(TETROMINOES);
        for (let i = this.bag.length - 1; i > 0; i--) {
          const j = Math.floor(this.random() * (i + 1));
          [this.bag[i], this.bag[j]] = [this.bag[j], this.bag[i]];
        }
      }
      this.queue.push(this.bag.pop());
    }
  }
  spawn(type = null) {
    const selected = type || this.queue.shift();
    const spawnX = this.isSourceClassic ? type ? Math.round(this.random() * (this.width - TETROMINOES[selected].size)) : this.queueSpawns.shift() : Math.floor((this.width - TETROMINOES[selected].size) / 2);
    this.fillQueue();
    this.active = { type: selected, rotation: 0, x: spawnX, y: 0, z: Math.floor(this.depth / 2) };
    if (!this.isSourceClassic) {
      this.active.voxels = normalizeVoxels(TETROMINOES[selected].cells.map(([x, y]) => [x, y, 0]));
      this.active.x = Math.floor((this.width - Math.max(...this.active.voxels.map((c) => c[0])) - 1) / 2);
      this.active.z = Math.floor((this.depth - 1) / 2);
    }
    this.lockResets = 0;
    this.everGrounded = false;
    this.groundAge = 0;
    if (!this.isSourceClassic) this.gravity = 0;
    this.lockTime = 0;
    if (!this.fits(this.active)) this.gameOver = true;
  }
  shapeCells(type, rotation = 0) {
    return this.isSourceClassic ? sourceRotatedCells(type, rotation) : rotatedCells(type, rotation);
  }
  colorFor(type) {
    return this.isSourceClassic ? SOURCE_COLORS[type] : TETROMINOES[type].color;
  }
  localCells(piece = this.active) {
    return !this.isSourceClassic && piece.voxels ? piece.voxels : this.shapeCells(piece.type, piece.rotation).map(([x, y]) => [x, y, 0]);
  }
  cells(piece = this.active) {
    return this.localCells(piece).map(([x, y, z]) => ({ x: x + piece.x, y: y + piece.y, z: z + piece.z }));
  }
  fits(piece) {
    return this.cells(piece).every(({ x, y, z }) => x >= 0 && x < this.width && y >= 0 && y < this.height && z >= 0 && z < this.depth && !this.board[y][z][x]);
  }
  move(dx, dz = 0, dy = 0) {
    if (this.gameOver) return false;
    const next = { ...this.active, x: this.active.x + dx, y: this.active.y + dy, z: this.active.z + dz };
    if (!this.fits(next)) {
      if (this.isSourceClassic && dy === 1 && dx === 0 && dz === 0) this.lock();
      return false;
    }
    const wasGrounded = !this.fits({ ...this.active, y: this.active.y + 1 });
    this.active = next;
    this.resetLockDelay(wasGrounded);
    if (dy > 0 && !this.isSourceClassic) this.score += dy;
    return true;
  }
  resetLockDelay(wasGrounded) {
    if (this.isSourceClassic) {
      this.lockTime = 0;
      return;
    }
    if (wasGrounded) {
      this.everGrounded = true;
      if (this.lockResets < 15) {
        this.lockResets++;
        this.lockTime = 0;
      }
    } else if (!this.everGrounded) this.lockTime = 0;
  }
  rotate(direction = 1, axis = "z") {
    if (this.gameOver) return false;
    if (this.isSourceClassic) {
      if (direction !== 1) return false;
      const next = { ...this.active, rotation: (this.active.rotation + 1) % 4 };
      if (!this.fits(next)) return false;
      this.active = next;
      return true;
    }
    if (!["x", "y", "z"].includes(axis)) return false;
    const voxels2 = rotateVoxels(this.localCells(), axis, direction), rotation = (this.active.rotation + direction + 4) % 4;
    const wasGrounded = !this.fits({ ...this.active, y: this.active.y + 1 });
    const kicks = [[0, 0, 0], [-1, 0, 0], [1, 0, 0], [0, 0, -1], [0, 0, 1], [-2, 0, 0], [2, 0, 0], [0, 0, -2], [0, 0, 2], [-3, 0, 0], [3, 0, 0], [0, 0, -3], [0, 0, 3], [0, -1, 0], [0, -2, 0], [0, -3, 0]];
    for (const [dx, dy, dz] of kicks) {
      const next = { ...this.active, voxels: voxels2, rotation, x: this.active.x + dx, y: this.active.y + dy, z: this.active.z + dz };
      if (this.fits(next)) {
        this.active = next;
        this.resetLockDelay(wasGrounded);
        return true;
      }
    }
    return false;
  }
  ghost() {
    const p = { ...this.active };
    while (this.fits({ ...p, y: p.y + 1 })) p.y++;
    return p;
  }
  hardDrop() {
    if (this.gameOver || this.isSourceClassic) return 0;
    const landing = this.ghost(), distance = landing.y - this.active.y;
    this.score += distance * 2;
    this.active = landing;
    this.lock();
    return distance;
  }
  hold() {
    if (this.gameOver || !this.canHold || this.isSourceClassic) return false;
    const type = this.active.type, previous = this.holdType;
    this.holdType = type;
    this.spawn(previous);
    this.canHold = false;
    return true;
  }
  clearPlanes() {
    let count = 0;
    this.lastClearCells = [];
    this.lastClearWaves = 0;
    if (this.isSourceClassic) {
      for (let y = this.height - 1; y >= 0; y--) {
        if (this.board[y][0].every(Boolean)) {
          this.board.splice(y, 1);
          this.board.unshift([Array(this.width).fill(null)]);
          count++;
          y++;
        }
      }
    } else {
      for (; ; ) {
        const removed = /* @__PURE__ */ new Set();
        let lines = 0;
        const mark = (x, y, z) => removed.add(x + this.width * (z + this.depth * y));
        for (let y = 0; y < this.height; y++) {
          if (this.width > 1 || this.depth === 1) {
            for (let z = 0; z < this.depth; z++) if (this.board[y][z].every(Boolean)) {
              lines++;
              for (let x = 0; x < this.width; x++) mark(x, y, z);
            }
          }
          if (this.depth > 1) {
            for (let x = 0; x < this.width; x++) if (this.board[y].every((lane) => Boolean(lane[x]))) {
              lines++;
              for (let z = 0; z < this.depth; z++) mark(x, y, z);
            }
          }
        }
        if (!lines) break;
        count += lines;
        this.lastClearWaves++;
        for (const index of removed) {
          const x = index % this.width, z = Math.floor(index / this.width) % this.depth, y = Math.floor(index / (this.width * this.depth));
          this.lastClearCells.push({ x, y, z });
        }
        for (let z = 0; z < this.depth; z++) for (let x = 0; x < this.width; x++) {
          let destination = this.height - 1;
          for (let y = this.height - 1; y >= 0; y--) if (!removed.has(x + this.width * (z + this.depth * y))) this.board[destination--][z][x] = this.board[y][z][x];
          while (destination >= 0) this.board[destination--][z][x] = null;
        }
      }
    }
    this.lines += count;
    this.level = 1 + Math.floor(this.lines / 10);
    this.lastClearScore = this.isSourceClassic ? count > 0 ? 100 * Math.pow(2, count - 1) : 0 : ([0, 100, 300, 500, 800][Math.min(count, 4)] + Math.max(0, count - 4) * 300) * this.level;
    this.score += this.lastClearScore;
    this.lastClear = count;
    return count;
  }
  lock() {
    if (this.gameOver) return;
    if (this.isSourceClassic) this.score += 10;
    for (const { x, y, z } of this.cells()) this.board[y][z][x] = this.active.type;
    this.clearPlanes();
    this.canHold = true;
    this.spawn();
  }
  update(dt) {
    if (this.gameOver) return false;
    this.gravity += dt;
    let changed = false;
    const period = this.dropPeriod();
    while (this.gravity >= period) {
      this.gravity -= period;
      const next = { ...this.active, y: this.active.y + 1 };
      if (this.fits(next)) {
        this.active = next;
        if (this.lockResets < 15) this.lockTime = 0;
        changed = true;
      } else {
        if (this.isSourceClassic) {
          this.lock();
          changed = true;
        }
        break;
      }
    }
    if (this.isSourceClassic) return changed;
    const grounded = !this.fits({ ...this.active, y: this.active.y + 1 });
    if (grounded) this.everGrounded = true;
    if (this.everGrounded) this.groundAge += dt;
    if (this.groundAge >= 8) {
      this.hardDrop();
      return true;
    }
    if (grounded) {
      this.lockTime += dt;
      if (this.lockTime >= 0.42) {
        this.lock();
        changed = true;
      }
    } else if (this.lockResets < 15) this.lockTime = 0;
    return changed;
  }
  dropPeriod() {
    return this.isSourceClassic ? Math.max(0.1, 0.6 - 5e-3 * this.lines) : Math.max(0.09, 0.8 * Math.pow(0.83, this.level - 1));
  }
  snapshot() {
    return { rules: this.rules, width: this.width, height: this.height, depth: this.depth, score: this.score, lines: this.lines, level: this.level, gameOver: this.gameOver, lastClear: this.lastClear, lastClearCells: this.lastClearCells.map((c) => ({ ...c })), lastClearWaves: this.lastClearWaves, lastClearScore: this.lastClearScore, active: { ...this.active, ...this.active.voxels ? { voxels: this.active.voxels.map((c) => [...c]) } : {} }, lockResets: this.lockResets, groundAge: this.groundAge, next: this.queue.slice(0, 3), hold: this.holdType, board: this.board.map((row) => row.map((lane) => lane.slice())) };
  }
};
function createGame(ctx) {
  let mode = "spatial", dimensions = { x: 6, y: 20, z: 6 }, engine, lastFollow = null, inspection = null, clearNotice = 0, clearText = "";
  ctx.ui.innerHTML = '<div class="control-group"><label>Mode <select data-mode><option value="spatial">3D</option><option value="classic">2D \xB7 Classic</option></select></label></div><div class="control-group"><div class="control-row"><button class="small-button" data-key="arrowup" aria-label="Move up">\u2191</button><button class="small-button" data-key="arrowleft" aria-label="Move left">\u2190</button><button class="small-button" data-key="arrowdown" aria-label="Move down">\u2193</button><button class="small-button" data-key="arrowright" aria-label="Move right">\u2192</button></div><div data-turns class="control-row"><button class="small-button" data-turn="left">A \u21B6</button><button class="small-button" data-turn="right">D \u21B7</button></div><div class="control-row" data-spatial-rotations><button class="small-button" data-action="rotate-x" title="Rotate X; Shift reverses">Q \u21BBX</button><button class="small-button" data-action="rotate-y" title="Rotate Y; Shift reverses">Z \u21BBY</button><button class="small-button" data-action="rotate-z" title="Rotate Z; Shift reverses">C \u21BBZ</button></div><div class="control-row"><button class="small-button" data-classic-rotate data-action="classic-rotate">\u2191 / Z \u21BB</button><button class="primary-button" data-action="drop">Space \u2913</button><button class="small-button" data-action="hold">H \u21C4</button><button class="small-button" data-action="reset" aria-label="Restart">\u21BA</button></div></div>';
  const el = (s) => ctx.ui.querySelector(s);
  const point2 = ({ x, y, z }) => [x - (engine.width - 1) / 2, (engine.height - 1) / 2 - y, z - (engine.depth - 1) / 2];
  const logical = ({ x, y, z }) => ({ x, y: engine.height - 1 - y, z });
  function activeCenter() {
    const cells = engine.cells();
    return point2({ x: cells.reduce((sum, c) => sum + c.x, 0) / 4, y: cells.reduce((sum, c) => sum + c.y, 0) / 4, z: cells.reduce((sum, c) => sum + c.z, 0) / 4 });
  }
  function follow() {
    if (engine.isSourceClassic) return;
    const target = activeCenter(), key2 = target.join(",");
    if (key2 === lastFollow) return;
    lastFollow = key2;
    ctx.spatial?.follow?.({ target, weight: 0.3 });
  }
  function preview(type) {
    if (!type) return '<span style="opacity:.4">\u2014</span>';
    const cells = engine.shapeCells(type);
    return '<span style="display:inline-grid;grid-template-columns:repeat(4,9px);grid-template-rows:repeat(4,9px);gap:2px;vertical-align:middle" aria-label="' + type + '">' + Array.from({ length: 16 }, (_, i) => '<i style="border-radius:1px;background:' + (cells.some(([x, y]) => x === i % 4 && y === Math.floor(i / 4)) ? engine.colorFor(type) : "transparent") + '"></i>').join("") + "</span>";
  }
  function draw() {
    const voxels2 = [], world = (c) => {
      const [x, y, z] = point2(c);
      return { x, y, z };
    };
    for (let y = 0; y < engine.height; y++) for (let z = 0; z < engine.depth; z++) for (let x = 0; x < engine.width; x++) {
      const type = engine.board[y][z][x];
      if (type) voxels2.push({ ...world({ x, y, z }), color: engine.colorFor(type), sx: 0.88, sy: 0.88, sz: 0.88, data: logical({ x, y, z }) });
    }
    if (!engine.gameOver) {
      if (!engine.isSourceClassic) for (const cell of engine.cells(engine.ghost())) voxels2.push({ ...world(cell), color: engine.colorFor(engine.active.type), sx: 0.94, sy: 0.94, sz: 0.94, opacity: 0.22, data: { ...logical(cell), ghost: true } });
      for (const cell of engine.cells()) voxels2.push({ ...world(cell), color: engine.colorFor(engine.active.type), sx: 0.96, sy: 0.96, sz: 0.96, data: { ...logical(cell), active: true } });
    }
    for (let z = 0; z < engine.depth; z++) for (let x = 0; x < engine.width; x++) voxels2.push({ ...world({ x, y: engine.height - 0.45, z }), color: (x + z) % 2 ? "#2b4765" : "#344e6a", sx: 0.93, sy: 0.06, sz: 0.93, data: { x, y: 0, z, floor: true } });
    for (const x of [-0.55, engine.width - 0.45]) for (const z of [-0.55, engine.depth - 0.45]) voxels2.push({ ...world({ x, y: (engine.height - 1) / 2, z }), color: "#8ca6c1", sx: 0.025, sy: engine.height, sz: 0.025, opacity: 0.35 });
    for (const z of [-0.55, engine.depth - 0.45]) voxels2.push({ ...world({ x: (engine.width - 1) / 2, y: engine.height - 0.5, z }), color: "#8ca6c1", sx: engine.width + 0.1, sy: 0.025, sz: 0.025, opacity: 0.35 });
    for (const x of [-0.55, engine.width - 0.45]) voxels2.push({ ...world({ x, y: engine.height - 0.5, z: (engine.depth - 1) / 2 }), color: "#8ca6c1", sx: 0.025, sy: 0.025, sz: engine.depth + 0.1, opacity: 0.35 });
    ctx.setVoxels(voxels2);
    ctx.setLabels([]);
    ctx.setStats({ "Score": engine.score, "Lines": engine.lines, "Level": engine.level });
    if (ctx.hud) ctx.hud.innerHTML = '<div class="arcade-scoreboard tetris-scoreboard" style="display:flex;gap:18px;align-items:flex-start;color:#e9f0f6;font-family:monospace;text-shadow:0 1px 3px #071320"><div><small>SCORE</small><strong style="display:block;font-size:24px">' + String(engine.score).padStart(6, "0") + "</strong><small>LEVEL " + String(engine.level).padStart(2, "0") + " \xB7 CLEAR " + engine.lines + '</small></div><div><small style="display:block;margin-bottom:5px">NEXT</small>' + engine.queue.slice(0, engine.isSourceClassic ? 1 : 3).map(preview).join(" ") + "</div>" + (engine.isSourceClassic ? "" : '<div><small style="display:block;margin-bottom:5px">HOLD</small>' + preview(engine.holdType) + "</div>") + "</div>";
    ctx.message(engine.gameOver ? "GAME OVER \xB7 R \u21BA" : clearNotice > 0 ? clearText : "");
  }
  function reset() {
    engine = new TetrisEngine(mode === "classic" ? { rules: "source-classic" } : { width: dimensions.x, height: dimensions.y, depth: dimensions.z });
    lastFollow = null;
    inspection = null;
    clearNotice = 0;
    el("[data-turns]").hidden = engine.isSourceClassic;
    el("[data-spatial-rotations]").hidden = engine.isSourceClassic;
    el("[data-classic-rotate]").hidden = !engine.isSourceClassic;
    for (const action of ["drop", "hold"]) el('[data-action="' + action + '"]').hidden = engine.isSourceClassic;
    draw();
    if (engine.isSourceClassic) ctx.frame({ target: [0, 0, 0], distance: 33, position: [0, 2, 33] });
    else {
      const size = [dimensions.x, dimensions.y, dimensions.z], distance = Math.max(...size) * 2.6 + 3;
      if (ctx.spatial?.volume) ctx.spatial.volume({ target: [0, 0, 0], distance, size });
      else ctx.frame({ target: [0, 0, 0], distance, position: [size[0] * 1.6, size[1] * 1.2, size[2] * 1.8] });
    }
  }
  function direction(key2) {
    if (engine.isSourceClassic) {
      if (key2 === "arrowleft") return engine.move(-1);
      if (key2 === "arrowright") return engine.move(1);
      if (key2 === "arrowdown") return engine.move(0, 0, 1);
      if (key2 === "arrowup") return engine.rotate();
      return false;
    }
    const delta = ctx.spatial?.vectorForKey(key2) ?? { arrowleft: [-1, 0, 0], arrowright: [1, 0, 0], arrowup: [0, 1, 0], arrowdown: [0, -1, 0] }[key2];
    return delta ? engine.move(delta[0], delta[2], -delta[1]) : false;
  }
  function act(action, key2 = null, inverse = false) {
    if (action === "reset") {
      reset();
      return;
    }
    inspection = null;
    const oldLines = engine.lines, oldOver = engine.gameOver;
    let changed = false;
    if (action === "direction") changed = direction(key2);
    if (action === "classic-rotate") changed = engine.rotate();
    if (action.startsWith("rotate-") && !engine.isSourceClassic) changed = engine.rotate(inverse ? -1 : 1, action.at(-1));
    if (action === "drop" && !engine.isSourceClassic && !engine.gameOver) {
      engine.hardDrop();
      changed = true;
    }
    if (action === "hold") changed = engine.hold();
    if (engine.lines > oldLines) {
      clearNotice = 1.4;
      clearText = engine.lastClear + " " + (engine.lastClear === 1 ? "LINE" : "LINES") + " \xB7 +" + engine.lastClearScore;
      ctx.sound?.("clear");
    } else if (!oldOver && engine.gameOver) ctx.sound?.("error");
    else if (changed) ctx.sound?.("move");
    draw();
    if (changed) follow();
  }
  el("[data-mode]").addEventListener("change", (e) => {
    mode = e.target.value;
    reset();
  });
  ctx.ui.querySelectorAll("[data-action]").forEach((b) => b.addEventListener("click", () => act(b.dataset.action)));
  ctx.ui.querySelectorAll("[data-key]").forEach((b) => b.addEventListener("click", () => act("direction", b.dataset.key)));
  ctx.ui.querySelectorAll("[data-turn]").forEach((b) => b.addEventListener("click", () => ctx.spatial?.turn?.(b.dataset.turn)));
  ctx.setRules?.("<p>Fill a horizontal X or Z line to clear it. Y is gravity. Crossed lines clear together; blocks above fall.</p><p>Arrows move. Q / Z / C rotate, Shift reverses. Space drops, H holds. A / D turn the view. X slices; Z restores the whole view.</p><p>Reach 10 lines to level up. A blocked spawn ends the game. The 2D Classic option preserves its original row rules.</p>");
  reset();
  return {
    reset,
    update(dt) {
      const oldLines = engine.lines, oldOver = engine.gameOver, hadNotice = clearNotice > 0;
      clearNotice = Math.max(0, clearNotice - dt);
      if (engine.update(dt)) {
        if (engine.lines > oldLines) {
          clearNotice = 1.4;
          clearText = engine.lastClear + " " + (engine.lastClear === 1 ? "LINE" : "LINES") + " \xB7 +" + engine.lastClearScore;
          ctx.sound?.("clear");
        } else if (!oldOver && engine.gameOver) ctx.sound?.("error");
        draw();
        follow();
      } else if (hadNotice && clearNotice === 0) draw();
    },
    onKey(key2, event) {
      key2 = key2.toLowerCase();
      const directionKey = ["arrowleft", "arrowright", "arrowup", "arrowdown"].includes(key2);
      const action = directionKey ? "direction" : engine.isSourceClassic ? { z: "classic-rotate" }[key2] : { " ": "drop", h: "hold", q: "rotate-x", z: "rotate-y", c: "rotate-z" }[key2];
      if (action) {
        event?.preventDefault();
        if (event?.repeat && !directionKey) return;
        act(action, key2, event?.shiftKey);
      }
    },
    getDimensions() {
      return { x: engine.width, y: engine.height, z: engine.depth };
    },
    setDimensions(values) {
      dimensions = validateTetrisDimensions(values);
      mode = "spatial";
      el("[data-mode]").value = mode;
      reset();
    },
    getSelection() {
      return inspection ?? logical(engine.cells().find((c) => c.x >= 0 && c.x < engine.width && c.y >= 0 && c.y < engine.height && c.z >= 0 && c.z < engine.depth) ?? { x: 0, y: 0, z: 0 });
    },
    selectCell(data) {
      if (data && ["x", "y", "z"].every((k) => Number.isInteger(data[k]))) {
        inspection = { x: data.x, y: data.y, z: data.z };
        return true;
      }
      return false;
    },
    cellPosition(data) {
      return data && ["x", "y", "z"].every((k) => Number.isInteger(data[k])) ? { x: data.x, y: data.y, z: data.z } : null;
    },
    cameraTurns: ["a", "d"],
    getState() {
      return { mode, spatial: !engine.isSourceClassic, volume: !engine.isSourceClassic, worldActive: engine.cells().map(point2), ghost: engine.cells(engine.ghost()), dimensions: { x: engine.width, y: engine.height, z: engine.depth }, ...engine.snapshot() };
    },
    dispose() {
      if (ctx.hud) ctx.hud.innerHTML = "";
    }
  };
}

// ../Cubiverse/src/games/sudoku-view.js
function createGame2(ctx) {
  let game, selected = 0, noteMode = false, lastSecond = -1, cameraPreset = "volume", fallbackPlane = "xy", dimensions = { x: 3, y: 3, z: 3 };
  const doc = ctx.ui.ownerDocument || document;
  ctx.ui.innerHTML = `<div class="control-group"><label><select aria-label="Sudoku mode" data-mode><option value="volume">3D</option><option value="classic">9 \xD7 9</option></select></label><p class="hint" data-selection></p><p class="hint" data-notes></p><div class="control-row" data-numbers></div><div class="control-row"><button class="small-button" data-note title="Notes \xB7 N">\u270E N</button><button class="small-button" data-erase title="Erase">\u232B</button><button class="small-button" data-undo title="Undo \xB7 U">\u21B6 U</button><button class="small-button" data-hint title="Hint \xB7 H">\u2600 H</button></div><div class="control-row" data-movement></div><div class="control-row" data-turns></div><div class="control-row"><button class="small-button" data-restart title="Restart">\u21BB</button><button class="primary-button" data-new title="New puzzle">\uFF0B</button></div><p class="hint" data-help></p><div data-block></div><details><summary>Board</summary><div class="piece-grid" data-board></div></details></div>`;
  const q = (s) => ctx.ui.querySelector(s), mode = q("[data-mode]"), hud = ctx.hud ? doc.createElement("div") : null;
  if (hud) {
    hud.className = "game-hud sudoku-hud";
    hud.style.cssText = "position:absolute;top:14px;left:14px;right:14px;display:flex;justify-content:center;gap:18px;color:#3b5961;pointer-events:none;font:600 13px system-ui;font-variant-numeric:tabular-nums";
    ctx.hud.append(hud);
  }
  const button = (text2, action, chosen = false) => {
    const el = doc.createElement("button");
    el.type = "button";
    el.className = `small-button${chosen ? " selected" : ""}`;
    el.textContent = text2;
    el.onclick = action;
    return el;
  };
  const coords = (i) => dimensionSudokuCoordinates(i, game.dimensions), index = (p) => dimensionSudokuIndex(p.x, p.y, p.z, game.dimensions);
  const world = (p) => game.volume ? ["x", "y", "z"].map((a) => (p[a] - (game.dimensions[a] - 1) / 2) * 1.18) : [p.x - 4, 4 - p.z, 0];
  function initCamera() {
    const size = ["x", "y", "z"].map((a) => game.dimensions[a] * 1.18);
    if (game.volume) {
      ctx.spatial?.volume ? ctx.spatial.volume({ target: [0, 0, 0], distance: Math.max(...size) * 2.65, size }) : ctx.frame({ target: [0, 0, 0], distance: Math.max(...size) * 2.65 });
    } else ctx.frame({ target: [0, 0, 0], distance: 20, position: [0, 0, 20] });
  }
  function status() {
    const time = `${Math.floor(game.elapsed / 60)}:${String(Math.floor(game.elapsed) % 60).padStart(2, "0")}`, done = game.board.filter(Boolean).length, bad = game.conflicts().size;
    ctx.setStats({ "Complete": `${done}/${game.board.length}`, "Conflicts": bad, "Time": time, "Hints": game.hints });
    if (hud) hud.innerHTML = `<span>\u270E ${done}/${game.board.length}</span><span>\u25F7 ${time}</span><span style="color:${bad ? "#be4937" : "inherit"}">${bad ? "! " + bad : "\u2713"}</span><span>${game.ruleVariant === "latin-axis" ? `1\u2013${game.digits} \xB7 unique axes` : "1\u20139 \xB7 3\xD73"}</span>`;
  }
  function cage(voxels2, p, edge, color, opacity, data) {
    for (let axis = 0; axis < 3; axis++) for (const a of [-1, 1]) for (const b of [-1, 1]) {
      const v = [...p], others = [0, 1, 2].filter((n) => n !== axis), scale = [0.012, 0.012, 0.012];
      v[others[0]] += a * edge / 2;
      v[others[1]] += b * edge / 2;
      scale[axis] = edge;
      voxels2.push({ x: v[0], y: v[1], z: v[2], sx: scale[0], sy: scale[1], sz: scale[2], color, opacity, data });
    }
  }
  function render() {
    const conflicts = game.conflicts(), voxels2 = [], labels2 = [], accessible = [];
    for (let i = 0; i < game.board.length; i++) {
      const p2 = coords(i), v = world(p2), value = game.board[i], active = i === selected;
      voxels2.push({ x: v[0], y: v[1], z: v[2], sx: 1.03, sy: 1.03, sz: game.volume ? 1.03 : 0.05, color: "#ffffff", opacity: 0.01, data: { index: i }, pickOnly: true });
      if (game.volume) cage(voxels2, v, 1.1, conflicts.has(i) ? "#cb6659" : active ? "#ce9440" : "#8aa5ad", active ? 0.85 : 0.16, { index: i, grid: true });
      else for (const axis of [0, 1]) for (const direction of [-1, 1]) {
        const point2 = [...v], scale = [0.012, 0.012, 0.012];
        point2[axis] += direction * 0.5;
        scale[1 - axis] = 1;
        voxels2.push({ x: point2[0], y: point2[1], z: 0.01, sx: scale[0], sy: scale[1], sz: scale[2], color: active ? "#ce9440" : "#8aa5ad", opacity: 0.45, data: { index: i, grid: true } });
      }
      if (value || game.notes[i].length) labels2.push({ x: v[0], y: v[1], z: v[2] + (game.volume ? 0 : 0.1), text: value ? String(value) : game.notes[i].join("\xB7"), size: value ? 0.52 : 0.23, color: conflicts.has(i) ? "#c34e40" : game.clues[i] ? "#314b56" : "#2675a4", data: { index: i }, float: game.volume ? 0.035 : 0, floatPhase: i % 13 * 0.43 });
      const b = button(value ? String(value) : "\xB7", () => choose(i), active);
      b.setAttribute("aria-label", `X ${p2.x + 1} Y ${p2.y + 1} Z ${p2.z + 1}, ${value || "Empty"}`);
      accessible.push(b);
    }
    ctx.setVoxels(voxels2);
    ctx.setLabels(labels2);
    q("[data-board]").style.gridTemplateColumns = `repeat(${game.dimensions.x},1fr)`;
    q("[data-board]").replaceChildren(...accessible);
    const p = coords(selected);
    q("[data-selection]").textContent = `${p.x + 1} / ${p.y + 1} / ${p.z + 1}${game.clues[selected] ? " \xB7 \u{1F512}" : ""}`;
    q("[data-notes]").textContent = game.notes[selected].join(" \xB7 ");
    q("[data-note]").textContent = noteMode ? "\u270E \u25CF" : "\u270E N";
    q("[data-note]").setAttribute("aria-pressed", String(noteMode));
    q("[data-undo]").disabled = !game.history.length;
    q("[data-turns]").hidden = !game.volume;
    q("[data-block]").replaceChildren();
    status();
    if (game.won) ctx.message("Complete \u2713");
  }
  function choose(i) {
    if (Number.isInteger(i) && i >= 0 && i < game.board.length) {
      selected = i;
      render();
    }
  }
  function move(input) {
    const vector = game.volume ? ctx.spatial?.vectorForKey(input) ?? sudokuVectorForKey(input, fallbackPlane) : sudokuVectorForKey(input, "xy");
    if (!vector) return;
    const p = coords(selected);
    if (game.volume) ["x", "y", "z"].forEach((a, n) => p[a] = Math.max(0, Math.min(game.dimensions[a] - 1, p[a] + vector[n])));
    else {
      p.x = Math.max(0, Math.min(8, p.x + vector[0]));
      p.z = Math.max(0, Math.min(8, p.z - vector[1]));
    }
    choose(index(p));
  }
  function enter(value) {
    if (game.set(selected, value, noteMode && value !== 0)) {
      ctx.sound?.(game.won ? "win" : game.conflicts().has(selected) ? "error" : "move");
      render();
    } else if (game.clues[selected]) ctx.message("\u{1F512} Clue");
  }
  function hint() {
    const i = game.hint(selected);
    if (i >= 0) choose(i);
  }
  function undo() {
    if (game.undo()) render();
  }
  function start() {
    game = new SudokuGame(mode.value === "classic" ? { volume: false } : { dimensions });
    selected = game.board.findIndex((v) => !v);
    if (selected < 0) selected = 0;
    noteMode = false;
    lastSecond = -1;
    cameraPreset = game.volume ? "volume" : "classic";
    q("[data-help]").textContent = game.ruleVariant === "latin-axis" ? `1\u2013${game.digits} \xB7 no repeats on each axis` : "1\u20139 in each 3\xD73 plane. No repeats on each axis.";
    q("[data-numbers]").replaceChildren(...Array.from({ length: game.digits }, (_, i) => button(String(i + 1), () => enter(i + 1))));
    render();
    initCamera();
  }
  q("[data-movement]").replaceChildren(...[["\u2190", "arrowleft"], ["\u2191", "arrowup"], ["\u2193", "arrowdown"], ["\u2192", "arrowright"]].map(([label, key2]) => button(label, () => move(key2))));
  q("[data-turns]").replaceChildren(...[["W", "up"], ["S", "down"], ["A", "left"], ["D", "right"]].map(([label, direction]) => button(label, () => ctx.spatial?.turn?.(direction))));
  mode.onchange = start;
  q("[data-note]").onclick = () => {
    noteMode = !noteMode;
    render();
  };
  q("[data-erase]").onclick = () => enter(0);
  q("[data-undo]").onclick = undo;
  q("[data-hint]").onclick = hint;
  q("[data-new]").onclick = start;
  q("[data-restart]").onclick = () => {
    game.restart();
    render();
  };
  ctx.setRules?.("<p>Each 3\xD73 plane contains 1\u20139 once. No axis repeats. A 6\xD76\xD76 space has eight 3\xD73\xD73 blocks.</p><p>Custom spaces up to 9 per axis retain 1\u20139 when two axes have at least three cells. Partial edge planes must contain no repeats.</p><p>Larger or narrow spaces use 1\u2013N, where N is the longest axis. No axis repeats. Every puzzle has one solution.</p><p>Black: clues. Blue: your numbers. Red: conflicts. N notes, U undo, H hint.</p>");
  start();
  return { reset: start, getDimensions() {
    return { ...game.dimensions };
  }, setDimensions(d) {
    if (!validSudokuDimensions(d)) throw new RangeError("XYZ must be positive integers.");
    dimensions = { ...d };
    mode.value = "volume";
    start();
  }, getSelection() {
    return coords(selected);
  }, cellPosition(data) {
    return Number.isInteger(data?.index) ? coords(data.index) : null;
  }, selectCell(data) {
    if (Number.isInteger(data?.index)) choose(data.index);
  }, onView(view) {
    cameraPreset = view;
    if (SUDOKU_PLANES[view]) fallbackPlane = view;
  }, update(dt) {
    game.tick(dt);
    const second = Math.floor(game.elapsed);
    if (second !== lastSecond) {
      lastSecond = second;
      status();
    }
  }, onKey(input, event) {
    const k = input.toLowerCase();
    if (/^[1-9]$/.test(k)) {
      event?.preventDefault();
      enter(Number(k));
    } else if (k.startsWith("arrow")) {
      event?.preventDefault();
      move(k);
    } else if (["backspace", "delete", "0"].includes(k)) {
      event?.preventDefault();
      enter(0);
    } else if (k === "n") {
      noteMode = !noteMode;
      render();
    } else if (k === "u") undo();
    else if (k === "h") hint();
  }, onPick(data) {
    if (Number.isInteger(data?.index)) choose(data.index);
  }, getState() {
    return { ...game.getState(), selected, noteMode, viewMode: game.volume ? "volume" : "classic", cameraPreset, activePlane: game.volume ? "volume" : "xy", spatial: game.volume };
  }, dispose() {
    hud?.remove();
    ctx.ui.replaceChildren();
  } };
}

// ../Cubiverse/src/games/sudoku.js
var ALL = 511;
var constraintCache = /* @__PURE__ */ new Map();
function sudokuIndex(x, y, z, volume = true) {
  return volume ? x + 6 * (z + 6 * y) : x + 9 * z;
}
function shuffled(values, rng) {
  const result = [...values];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}
function sudokuConstraints(volume = true) {
  volume = !!volume;
  if (constraintCache.has(volume)) return constraintCache.get(volume);
  const groups = [], kinds = [], push = (cells, kind) => {
    groups.push(cells);
    kinds.push(kind);
  };
  if (volume) {
    for (let y = 0; y < 6; y++) for (let z = 0; z < 6; z++) push(Array.from({ length: 6 }, (_, x) => sudokuIndex(x, y, z)), "axis-x");
    for (let x = 0; x < 6; x++) for (let z = 0; z < 6; z++) push(Array.from({ length: 6 }, (_, y) => sudokuIndex(x, y, z)), "axis-y");
    for (let x = 0; x < 6; x++) for (let y = 0; y < 6; y++) push(Array.from({ length: 6 }, (_, z) => sudokuIndex(x, y, z)), "axis-z");
    for (let bx = 0; bx < 2; bx++) for (let by = 0; by < 2; by++) for (let bz = 0; bz < 2; bz++) for (const axis of ["x", "y", "z"]) for (let fixed = 0; fixed < 3; fixed++) {
      const cells = [];
      for (let a = 0; a < 3; a++) for (let b = 0; b < 3; b++) {
        const p = axis === "x" ? { x: fixed, y: a, z: b } : axis === "y" ? { x: a, y: fixed, z: b } : { x: a, y: b, z: fixed };
        cells.push(sudokuIndex(bx * 3 + p.x, by * 3 + p.y, bz * 3 + p.z));
      }
      push(cells, `block-plane-${axis}`);
    }
  } else {
    for (let z = 0; z < 9; z++) push(Array.from({ length: 9 }, (_, x) => sudokuIndex(x, 0, z, false)), "row");
    for (let x = 0; x < 9; x++) push(Array.from({ length: 9 }, (_, z) => sudokuIndex(x, 0, z, false)), "column");
    for (let bx = 0; bx < 3; bx++) for (let bz = 0; bz < 3; bz++) {
      const cells = [];
      for (let z = 0; z < 3; z++) for (let x = 0; x < 3; x++) cells.push(sudokuIndex(bx * 3 + x, 0, bz * 3 + z, false));
      push(cells, "box");
    }
  }
  const membership = Array.from({ length: volume ? 216 : 81 }, () => []);
  groups.forEach((cells, g) => cells.forEach((index) => membership[index].push(g)));
  const result = { groups, membership, kinds, layers: volume ? 6 : 1, size: volume ? 6 : 9, digits: 9 };
  constraintCache.set(volume, result);
  return result;
}
function sudokuConflicts(board, volume = true) {
  const conflicts = /* @__PURE__ */ new Set(), { groups, membership } = sudokuConstraints(volume);
  if (board.length !== membership.length) return new Set(board.map((_, i) => i));
  board.forEach((value, index) => {
    if (!Number.isInteger(value) || value < 0 || value > 9) conflicts.add(index);
  });
  for (const cells of groups) {
    const seen = /* @__PURE__ */ new Map();
    for (const index of cells) {
      const value = board[index];
      if (!value) continue;
      if (seen.has(value)) {
        conflicts.add(index);
        conflicts.add(seen.get(value));
      } else seen.set(value, index);
    }
  }
  return conflicts;
}
function countSudokuSolutions(input, volume = true, { limit = 2, maxNodes = 2e4 } = {}) {
  const { membership, groups } = sudokuConstraints(volume), board = [...input], masks = new Uint16Array(groups.length);
  let count = 0, nodes = 0, aborted = false, solution = null;
  if (board.length !== membership.length) return { count: 0, complete: true, nodes, solution };
  for (let i = 0; i < board.length; i++) {
    const value = board[i];
    if (!Number.isInteger(value) || value < 0 || value > 9) return { count: 0, complete: true, nodes, solution };
    if (!value) continue;
    const bit = 1 << value - 1;
    if (membership[i].some((g) => masks[g] & bit)) return { count: 0, complete: true, nodes, solution };
    for (const g of membership[i]) masks[g] |= bit;
  }
  function search() {
    if (count >= limit || aborted) return;
    if (++nodes > maxNodes) {
      aborted = true;
      return;
    }
    let best = -1, bestMask = 0, bestCount = 10;
    for (let i = 0; i < board.length; i++) {
      if (board[i]) continue;
      let used = 0;
      for (const g of membership[i]) used |= masks[g];
      const available = ALL & ~used;
      if (!available) return;
      let amount = 0;
      for (let b = available; b; b &= b - 1) amount++;
      if (amount < bestCount) {
        best = i;
        bestMask = available;
        bestCount = amount;
      }
      if (amount === 1) break;
    }
    if (best === -1) {
      count++;
      if (!solution) solution = [...board];
      return;
    }
    for (let value = 1; value <= 9; value++) {
      const bit = 1 << value - 1;
      if (!(bestMask & bit)) continue;
      board[best] = value;
      for (const g of membership[best]) masks[g] |= bit;
      search();
      for (const g of membership[best]) masks[g] &= ~bit;
      board[best] = 0;
      if (count >= limit || aborted) break;
    }
  }
  search();
  return { count, complete: !aborted, nodes, solution };
}
function coordinatePermutation(size, rng) {
  const blocks = shuffled(Array.from({ length: size / 3 }, (_, i) => i), rng);
  return blocks.flatMap((b) => shuffled([b * 3, b * 3 + 1, b * 3 + 2], rng));
}
function generateSudoku({ volume = true, rng = Math.random, holes = volume ? 96 : 42 } = {}) {
  const digits = shuffled([1, 2, 3, 4, 5, 6, 7, 8, 9], rng), solution = [];
  if (volume) {
    const maps = Array.from({ length: 3 }, () => coordinatePermutation(6, rng)), axes4 = shuffled([0, 1, 2], rng);
    for (let y = 0; y < 6; y++) for (let z = 0; z < 6; z++) for (let x = 0; x < 6; x++) {
      const original = [maps[0][x], maps[1][y], maps[2][z]], [u, v, w] = axes4.map((a2) => original[a2]);
      const a = (u % 3 + w % 3 + Math.floor(v / 3) + Math.floor(w / 3)) % 3, b = (v % 3 + w % 3 + Math.floor(u / 3)) % 3;
      solution.push(digits[a + 3 * b]);
    }
  } else {
    const rows = coordinatePermutation(9, rng), columns = coordinatePermutation(9, rng), transpose = rng() < 0.5;
    for (let row = 0; row < 9; row++) for (let column = 0; column < 9; column++) {
      const x = transpose ? rows[row] : columns[column], z = transpose ? columns[column] : rows[row];
      solution.push(digits[(x + z * 3 + Math.floor(z / 3)) % 9]);
    }
  }
  const clues = [...solution];
  let removed = 0, rejectedBudget = 0;
  for (const index of shuffled(clues.map((_, i) => i), rng)) {
    if (removed >= holes) break;
    const value = clues[index];
    clues[index] = 0;
    const proof = countSudokuSolutions(clues, volume, { maxNodes: 4e3 });
    if (proof.complete && proof.count === 1) removed++;
    else {
      clues[index] = value;
      if (!proof.complete) rejectedBudget++;
    }
  }
  return { solution, clues, volume, unique: true, removed, rejectedBudget };
}
function validSudokuDimensions(d) {
  return d && ["x", "y", "z"].every((a) => Number.isSafeInteger(d[a]) && d[a] > 0) && Number.isSafeInteger(d.x * d.y * d.z);
}
var dimensionSudokuIndex = (x, y, z, d) => x + d.x * (z + d.z * y);
var dimensionSudokuCoordinates = (index, d) => ({ x: index % d.x, y: Math.floor(index / (d.x * d.z)), z: Math.floor(index / d.x) % d.z });
function dimensionSudokuConstraints(d) {
  if (!validSudokuDimensions(d)) throw new RangeError("XYZ must be positive integers.");
  if (d.x === 6 && d.y === 6 && d.z === 6) return sudokuConstraints(true);
  const groups = [], membership = Array.from({ length: d.x * d.y * d.z }, () => []), blockPlanes = Math.max(d.x, d.y, d.z) <= 9 && Object.values(d).filter((n) => n >= 3).length >= 2;
  for (const axis of ["x", "y", "z"]) {
    const other = ["x", "y", "z"].filter((a) => a !== axis);
    for (let a = 0; a < d[other[0]]; a++) for (let b = 0; b < d[other[1]]; b++) {
      const line2 = [];
      for (let n = 0; n < d[axis]; n++) {
        const p = { [axis]: n, [other[0]]: a, [other[1]]: b };
        line2.push(dimensionSudokuIndex(p.x, p.y, p.z, d));
      }
      const id3 = groups.length;
      groups.push(line2);
      line2.forEach((i) => membership[i].push(id3));
    }
  }
  if (blockPlanes) for (let bx = 0; bx < d.x; bx += 3) for (let by = 0; by < d.y; by += 3) for (let bz = 0; bz < d.z; bz += 3) for (const axis of ["x", "y", "z"]) for (let fixed = 0; fixed < Math.min(3, d[axis] - { x: bx, y: by, z: bz }[axis]); fixed++) {
    const origin = { x: bx, y: by, z: bz }, others = ["x", "y", "z"].filter((a) => a !== axis), line2 = [];
    for (let a = 0; a < Math.min(3, d[others[0]] - origin[others[0]]); a++) for (let b = 0; b < Math.min(3, d[others[1]] - origin[others[1]]); b++) {
      const p = { ...origin, [axis]: origin[axis] + fixed, [others[0]]: origin[others[0]] + a, [others[1]]: origin[others[1]] + b };
      line2.push(dimensionSudokuIndex(p.x, p.y, p.z, d));
    }
    const id3 = groups.length;
    groups.push(line2);
    line2.forEach((i) => membership[i].push(id3));
  }
  return { groups, membership, digits: blockPlanes ? 9 : Math.max(d.x, d.y, d.z), kinds: groups.map(() => "axis"), ruleVariant: blockPlanes ? "block-3-clipped" : "latin-axis" };
}
function dimensionSudokuConflicts(board, d) {
  const { groups, digits, membership } = dimensionSudokuConstraints(d), bad = /* @__PURE__ */ new Set();
  if (board.length !== membership.length) return new Set(board.map((_, i) => i));
  board.forEach((v, i) => {
    if (!Number.isInteger(v) || v < 0 || v > digits) bad.add(i);
  });
  for (const group of groups) {
    const found = /* @__PURE__ */ new Map();
    for (const i of group) {
      if (!board[i]) continue;
      if (found.has(board[i])) {
        bad.add(i);
        bad.add(found.get(board[i]));
      } else found.set(board[i], i);
    }
  }
  return bad;
}
function generateDimensionSudoku(dimensions, { rng = Math.random, holes = Math.floor(dimensions.x * dimensions.y * dimensions.z * 0.42) } = {}) {
  if (!validSudokuDimensions(dimensions)) throw new RangeError("XYZ must be positive integers.");
  if (dimensions.x === 6 && dimensions.y === 6 && dimensions.z === 6) return { ...generateSudoku({ rng, holes }), dimensions: { ...dimensions }, digits: 9, ruleVariant: "block-3" };
  const { groups, membership, digits, ruleVariant } = dimensionSudokuConstraints(dimensions), palette = shuffled(Array.from({ length: digits }, (_, i) => i + 1), rng), solution = membership.map((_, i) => {
    const p = dimensionSudokuCoordinates(i, dimensions);
    if (ruleVariant === "block-3-clipped") {
      const a = (p.x % 3 + p.z % 3 + Math.floor(p.y / 3) + Math.floor(p.z / 3)) % 3, b = (p.y % 3 + p.z % 3 + Math.floor(p.x / 3)) % 3;
      return palette[a + 3 * b];
    }
    return palette[(p.x + p.y + p.z) % digits];
  }), clues = [...solution];
  let removed = 0;
  for (const index of shuffled(solution.map((_, i) => i), rng)) {
    if (removed >= holes) break;
    const seen = new Set(membership[index].flatMap((g) => groups[g]).filter((i) => i !== index).map((i) => clues[i]).filter(Boolean));
    if (seen.size === digits - 1) {
      clues[index] = 0;
      removed++;
    }
  }
  return { solution, clues, dimensions: { ...dimensions }, volume: true, digits, ruleVariant, unique: true, removed };
}
var SudokuGame = class {
  constructor(options = {}) {
    this.newPuzzle(options);
  }
  newPuzzle(options = {}) {
    const puzzle = options.puzzle || (options.dimensions ? generateDimensionSudoku(options.dimensions, options) : options.volume === false ? generateSudoku(options) : generateDimensionSudoku({ x: 3, y: 3, z: 3 }, options));
    this.volume = puzzle.volume;
    this.dimensions = puzzle.dimensions ?? (this.volume ? { x: 6, y: 6, z: 6 } : { x: 9, y: 1, z: 9 });
    this.digits = puzzle.digits ?? 9;
    this.ruleVariant = puzzle.ruleVariant ?? (this.volume ? "block-3" : "classic");
    this.solution = [...puzzle.solution];
    this.clues = [...puzzle.clues];
    if (options.puzzle) {
      const proof = countSudokuSolutions(this.clues, this.volume);
      this.unique = proof.complete && proof.count === 1;
    } else this.unique = puzzle.unique;
    this.restart();
  }
  conflicts() {
    return ["latin-axis", "block-3-clipped"].includes(this.ruleVariant) ? dimensionSudokuConflicts(this.board, this.dimensions) : sudokuConflicts(this.board, this.volume);
  }
  isSolved() {
    return this.board.every((v) => Number.isInteger(v) && v > 0 && v <= this.digits) && this.conflicts().size === 0;
  }
  restart() {
    this.board = [...this.clues];
    this.notes = this.board.map(() => []);
    this.history = [];
    this.elapsed = 0;
    this.started = false;
    this.hints = 0;
    this.moves = 0;
    this.won = this.isSolved();
  }
  set(index, value, asNote = false) {
    if (this.won || !Number.isInteger(index) || index < 0 || index >= this.board.length || this.clues[index] || !Number.isInteger(value) || value < 0 || value > this.digits) return false;
    if (asNote && value && this.board[index]) return false;
    const old = { index, value: this.board[index], notes: [...this.notes[index]], hints: this.hints };
    if (asNote && value) {
      const notes = this.notes[index];
      this.notes[index] = notes.includes(value) ? notes.filter((n) => n !== value) : [...notes, value].sort((a, b) => a - b);
    } else {
      if (this.board[index] === value && !this.notes[index].length) return false;
      this.board[index] = value;
      this.notes[index] = [];
    }
    this.history.push(old);
    this.started = true;
    this.moves++;
    this.won = this.isSolved();
    return true;
  }
  undo() {
    const old = this.history.pop();
    if (!old) return false;
    this.board[old.index] = old.value;
    this.notes[old.index] = old.notes;
    this.hints = old.hints;
    this.moves = Math.max(0, this.moves - 1);
    this.won = false;
    return true;
  }
  hint(preferred) {
    if (this.won) return -1;
    const target = Number.isInteger(preferred) && preferred >= 0 && preferred < this.board.length && !this.clues[preferred] && this.board[preferred] !== this.solution[preferred] ? preferred : this.board.findIndex((v, i) => v !== this.solution[i]);
    if (target < 0 || !this.set(target, this.solution[target])) return -1;
    this.hints++;
    return target;
  }
  tick(dt) {
    if (this.started && !this.won) this.elapsed += dt;
  }
  getState() {
    return { volume: this.volume, dimensions: ["x", "y", "z"].map((a) => this.dimensions[a]), blockSize: this.ruleVariant === "latin-axis" ? null : this.volume ? [3, 3, 3] : [3, 1, 3], digits: this.digits, ruleVariant: this.ruleVariant, board: [...this.board], clues: [...this.clues], notes: this.notes.map((n) => [...n]), conflicts: [...this.conflicts()], elapsed: this.elapsed, moves: this.moves, hints: this.hints, won: this.won, unique: this.unique };
  }
};
var SUDOKU_PLANES = { xy: { right: [1, 0, 0], up: [0, 1, 0], normal: [0, 0, 1], axis: "z" }, xz: { right: [1, 0, 0], up: [0, 0, -1], normal: [0, 1, 0], axis: "y" }, yz: { right: [0, 0, -1], up: [0, 1, 0], normal: [1, 0, 0], axis: "x" } };
function sudokuVectorForKey(input, plane = "xy") {
  const k = input.toLowerCase(), b = SUDOKU_PLANES[plane] || SUDOKU_PLANES.xy;
  const v = k === "arrowright" ? b.right : k === "arrowleft" ? b.right.map((v2) => -v2) : k === "arrowup" ? b.up : k === "arrowdown" ? b.up.map((v2) => -v2) : null;
  return v ? v.map((v2) => v2 || 0) : null;
}

// ../Cubiverse/src/games/pacman-navigation.js
var clean = (vector) => vector.map((value) => value || 0);
var negate = (vector) => clean(vector.map((value) => -value));
var cross3 = (a, b) => clean([a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]]);
var PACMAN_CHASE = { distance: 3.5, height: 2.7, pullback: 1.15, lift: 0.65, side: 0.65, fov: 58 };
function pacmanTurnName(input) {
  return { arrowup: "up", w: "up", up: "up", arrowdown: "down", s: "down", down: "down", arrowleft: "left", a: "left", left: "left", arrowright: "right", d: "right", right: "right" }[String(input).toLowerCase()] ?? null;
}
function pacmanInitialFrame(forward) {
  const up = forward[1] ? [0, 0, -Math.sign(forward[1])] : [0, 1, 0];
  return { forward: [...forward], up, right: cross3(forward, up) };
}
function pacmanTurnFrame(frame2, input) {
  const turn = pacmanTurnName(input);
  if (!turn) return null;
  const f = frame2.forward, u = frame2.up, r = cross3(f, u);
  const forward = turn === "up" ? [...u] : turn === "down" ? negate(u) : turn === "right" ? r : negate(r);
  const up = turn === "up" ? negate(f) : turn === "down" ? [...f] : [...u];
  return { forward, up, right: cross3(forward, up) };
}
function pacmanWallPanels(cells) {
  const panels = [], axes4 = ["x", "y", "z"];
  for (const id3 of cells) {
    const values = id3.split(",").map(Number), cell = { x: values[0], y: values[1], z: values[2] };
    for (let axis = 0; axis < 3; axis++) for (const sign of [-1, 1]) {
      const adjacent = [...values];
      adjacent[axis] += sign;
      if (cells.has(adjacent.join(","))) continue;
      const position = [...values], scale = [1.04, 1.04, 1.04];
      position[axis] += sign * 0.5;
      scale[axis] = 0.08;
      const surface = axis === 1 ? sign < 0 ? "floor" : "ceiling" : "wall";
      const normal = [0, 0, 0];
      normal[axis] = sign;
      panels.push({ position, scale, surface, normal, cell: { ...cell }, axis: axes4[axis] });
    }
  }
  return panels;
}
function pacmanCameraCutaway(panel, player, frame2) {
  const origin = [player.x, player.y, player.z], right = frame2.right ?? cross3(frame2.forward, frame2.up);
  for (const shot of [{ distance: PACMAN_CHASE.distance, height: PACMAN_CHASE.height, side: 0 }, { distance: PACMAN_CHASE.distance + PACMAN_CHASE.pullback, height: PACMAN_CHASE.height + PACMAN_CHASE.lift, side: PACMAN_CHASE.side }]) {
    const delta = frame2.forward.map((n, i) => -n * shot.distance + frame2.up[i] * shot.height + right[i] * shot.side);
    let enter = 0, exit = 1;
    for (let axis = 0; axis < 3; axis++) {
      const low = panel.position[axis] - panel.scale[axis] / 2 - 0.32, high = panel.position[axis] + panel.scale[axis] / 2 + 0.32;
      if (Math.abs(delta[axis]) < 1e-8) {
        if (origin[axis] < low || origin[axis] > high) {
          enter = 2;
          break;
        }
        continue;
      }
      const a = (low - origin[axis]) / delta[axis], b = (high - origin[axis]) / delta[axis];
      enter = Math.max(enter, Math.min(a, b));
      exit = Math.min(exit, Math.max(a, b));
      if (enter > exit) break;
    }
    if (enter <= exit && exit >= 0 && enter <= 1) return true;
  }
  return false;
}

// ../Cubiverse/src/games/pacman-maze-v13.js
var axes2 = ["x", "y", "z"];
var id = (p) => `${p.x},${p.y},${p.z}`;
var point = (id3) => {
  const [x, y, z] = id3.split(",").map(Number);
  return { x, y, z };
};
var vectors = [[1, 0, 0], [-1, 0, 0], [0, 1, 0], [0, -1, 0], [0, 0, 1], [0, 0, -1]];
function randomFor(seed) {
  let n = seed >>> 0;
  return () => {
    n += 1831565813;
    let t = n;
    t = Math.imul(t ^ t >>> 15, t | 1);
    t ^= t + Math.imul(t ^ t >>> 7, t | 61);
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  };
}
function generateExplorerMaze(dimensions, seed = 7463) {
  const random = randomFor(seed), coordinates = {};
  for (const axis of axes2) {
    const size = dimensions[axis], low2 = size > 3 ? 1 : 0, high2 = size > 3 ? size - 2 : size - 1;
    const count = Math.max(1, Math.ceil((high2 - low2) / 2.7) + 1);
    coordinates[axis] = Array.from({ length: count }, (_, i) => count === 1 ? low2 : Math.round(low2 + (high2 - low2) * i / (count - 1)));
  }
  const nodes = /* @__PURE__ */ new Map();
  for (const x of coordinates.x) for (const y of coordinates.y) for (const z of coordinates.z) nodes.set(id({ x, y, z }), { x, y, z });
  const neighbors = (p) => axes2.flatMap((axis) => {
    const i = coordinates[axis].indexOf(p[axis]);
    return [-1, 1].map((sign) => coordinates[axis][i + sign]).filter((value) => value !== void 0).map((value) => ({ ...p, [axis]: value }));
  });
  const start = { x: coordinates.x[0], y: coordinates.y[0], z: coordinates.z.at(-1) }, cells = /* @__PURE__ */ new Set([id(start)]), seen = /* @__PURE__ */ new Set([id(start)]), stack = [start], used = /* @__PURE__ */ new Set();
  const edge = (a, b) => [id(a), id(b)].sort().join("|");
  const carve = (a, b) => {
    const axis = axes2.find((axis2) => a[axis2] !== b[axis2]);
    if (!axis) {
      cells.add(id(a));
      return;
    }
    const sign = Math.sign(b[axis] - a[axis]);
    for (let v = a[axis]; v !== b[axis] + sign; v += sign) cells.add(id({ ...a, [axis]: v }));
    used.add(edge(a, b));
  };
  while (stack.length) {
    const p = stack.at(-1), options = neighbors(p).filter((n) => !seen.has(id(n)));
    if (!options.length) {
      stack.pop();
      continue;
    }
    const q = options[Math.floor(random() * options.length)];
    carve(p, q);
    seen.add(id(q));
    stack.push(q);
  }
  const candidates = [];
  for (const p of nodes.values()) for (const q of neighbors(p)) if (id(p) < id(q) && !used.has(edge(p, q))) candidates.push([p, q]);
  for (let i = candidates.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [candidates[i], candidates[j]] = [candidates[j], candidates[i]];
  }
  for (const [a, b] of candidates.slice(0, Math.ceil(candidates.length * 0.32))) carve(a, b);
  const rooms = [...cells].map(point), low = Object.fromEntries(axes2.map((a) => [a, coordinates[a][0]])), high = Object.fromEntries(axes2.map((a) => [a, coordinates[a].at(-1)]));
  return { size: dimensions.x, dimensions: { ...dimensions }, cells, rooms, start, low, high, middle: Object.fromEntries(axes2.map((a) => [a, Math.round((low[a] + high[a]) / 2)])), seed };
}
function pacmanPath(cells, start, target) {
  const from = id(start), to = id(target);
  if (!cells.has(from) || !cells.has(to)) return null;
  const previous = /* @__PURE__ */ new Map([[from, null]]), queue = [from];
  for (let i = 0; i < queue.length && !previous.has(to); i++) {
    const p = point(queue[i]);
    for (const [x, y, z] of vectors) {
      const next = id({ x: p.x + x, y: p.y + y, z: p.z + z });
      if (cells.has(next) && !previous.has(next)) {
        previous.set(next, queue[i]);
        queue.push(next);
      }
    }
  }
  if (!previous.has(to)) return null;
  const result = [];
  for (let next = to; next !== from; next = previous.get(next)) result.push(point(next));
  return result.reverse();
}

// ../Cubiverse/src/games/pacman-pipes.js
var axes3 = ["x", "y", "z"];
var id2 = (p) => `${p.x},${p.y},${p.z}`;
var vectors2 = [[1, 0, 0], [-1, 0, 0], [0, 1, 0], [0, -1, 0], [0, 0, 1], [0, 0, -1]];
var PACMAN_PIPE_PALETTE = ["#4678b9", "#4d9faa", "#6ac0ae", "#d4c57c", "#d99b87"];
function pacmanPipeTopology(cells) {
  const edges = [], joints = [];
  for (const code of cells) {
    const [x, y, z] = code.split(",").map(Number), cell = { x, y, z };
    const neighbors = vectors2.map((v, dir) => ({ dir, cell: { x: x + v[0], y: y + v[1], z: z + v[2] } })).filter((n) => cells.has(id2(n.cell)));
    for (const n of neighbors) if (n.dir % 2 === 0) edges.push({ from: cell, to: n.cell, axis: Math.floor(n.dir / 2), center: axes3.map((a) => (cell[a] + n.cell[a]) / 2) });
    if (neighbors.length !== 2 || neighbors[0].dir !== (neighbors[1].dir ^ 1)) joints.push({ cell, degree: neighbors.length });
  }
  return { edges, joints };
}
function pacmanLayerAmount(position, dimensions, up = [0, 1, 0]) {
  let projected = 0, extent = 0;
  for (let i = 0; i < 3; i++) {
    const half = (dimensions[axes3[i]] - 1) / 2;
    projected += (position[i] - half) * up[i];
    extent += half * Math.abs(up[i]);
  }
  return extent > 1e-8 ? Math.max(0, Math.min(1, (projected * Math.hypot(...up) / extent + 1) / 2)) : 0.5;
}
function createPacmanPipes(THREE4, { cells, dimensions, toWorld }) {
  const topology = pacmanPipeTopology(cells), group = new THREE4.Group();
  group.name = "pacman-round-pipes";
  const tubeGeometry = new THREE4.CylinderGeometry(0.335, 0.335, 1, 12, 1, true), jointGeometry = new THREE4.SphereGeometry(0.335, 12, 8);
  const material = new THREE4.MeshStandardMaterial({ color: "#ffffff", roughness: 0.25, metalness: 0.14, transparent: true, opacity: 0.52, depthWrite: false, side: THREE4.DoubleSide, emissive: "#284c5e", emissiveIntensity: 0.16 });
  const tubes = new THREE4.InstancedMesh(tubeGeometry, material, topology.edges.length), joints = new THREE4.InstancedMesh(jointGeometry, material, topology.joints.length);
  tubes.name = "pacman-pipe-segments";
  joints.name = "pacman-pipe-junctions";
  group.add(tubes, joints);
  tubes.userData.pickCells = topology.edges.map((edge) => ({ ...edge.from }));
  joints.userData.pickCells = topology.joints.map((joint) => ({ ...joint.cell }));
  tubes.renderOrder = 5;
  joints.renderOrder = 6;
  const transform = new THREE4.Object3D(), yAxis = new THREE4.Vector3(0, 1, 0), direction = new THREE4.Vector3();
  topology.edges.forEach((edge, index) => {
    transform.position.fromArray(toWorld(Object.fromEntries(axes3.map((axis, i) => [axis, edge.center[i]]))));
    direction.set(...axes3.map((a) => edge.to[a] - edge.from[a]));
    transform.quaternion.setFromUnitVectors(yAxis, direction);
    transform.scale.set(1, 1.015, 1);
    transform.updateMatrix();
    tubes.setMatrixAt(index, transform.matrix);
  });
  topology.joints.forEach((joint, index) => {
    transform.position.fromArray(toWorld(joint.cell));
    transform.quaternion.identity();
    transform.scale.setScalar(1);
    transform.updateMatrix();
    joints.setMatrixAt(index, transform.matrix);
  });
  for (const mesh of [tubes, joints]) {
    mesh.instanceMatrix.needsUpdate = true;
    mesh.computeBoundingSphere();
  }
  const palette = PACMAN_PIPE_PALETTE.map((color) => new THREE4.Color(color)), work = new THREE4.Color(), currentUp = new THREE4.Vector3(0, 1, 0), targetUp = currentUp.clone(), lastUp = new THREE4.Vector3(99, 99, 99);
  let disposed = false;
  function tint(mesh, positions) {
    positions.forEach((p, index) => {
      const t = pacmanLayerAmount(p, dimensions, currentUp.toArray()) * (palette.length - 1), lo = Math.floor(t), hi = Math.min(palette.length - 1, lo + 1);
      work.copy(palette[lo]).lerp(palette[hi], t - lo);
      mesh.setColorAt(index, work);
    });
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
  }
  function update(up = [0, 1, 0], dt = 1 / 60, { immediate = false } = {}) {
    if (disposed) return;
    targetUp.fromArray(up);
    if (targetUp.lengthSq() < 1e-5) return;
    targetUp.normalize();
    currentUp.lerp(targetUp, immediate ? 1 : 1 - Math.exp(-Math.min(0.1, Math.max(0, dt)) * 7));
    if (currentUp.distanceToSquared(lastUp) < 1e-8) return;
    lastUp.copy(currentUp);
    tint(tubes, topology.edges.map((edge) => edge.center));
    tint(joints, topology.joints.map((j) => axes3.map((a) => j.cell[a])));
  }
  update([0, 1, 0], 0, { immediate: true });
  return { group, tubes, joints, topology, update, getState() {
    return { type: "round-pipes", segments: topology.edges.length, junctions: topology.joints.length, palette: [...PACMAN_PIPE_PALETTE], layerUp: currentUp.toArray(), opacity: material.opacity, radius: 0.335 };
  }, dispose() {
    if (disposed) return;
    disposed = true;
    tubes.dispose();
    joints.dispose();
    tubeGeometry.dispose();
    jointGeometry.dispose();
    material.dispose();
  } };
}

// ../Cubiverse/src/games/pacman.js
var PACMAN_MAZE = [
  "############################",
  "#............##............#",
  "#.####.#####.##.#####.####.#",
  "#o####.#####.##.#####.####o#",
  "#.####.#####.##.#####.####.#",
  "#..........................#",
  "#.####.##.########.##.####.#",
  "#.####.##.########.##.####.#",
  "#......##....##....##......#",
  "######.##### ## #####.######",
  "######.##### ## #####.######",
  "######.##          ##.######",
  "######.## ###--### ##.######",
  "######.## #      # ##.######",
  "      .   #      #   .      ",
  "######.## #      # ##.######",
  "######.## ######## ##.######",
  "######.##          ##.######",
  "######.## ######## ##.######",
  "######.## ######## ##.######",
  "#............##............#",
  "#.####.#####.##.#####.####.#",
  "#.####.#####.##.#####.####.#",
  "#o..##.......  .......##..o#",
  "###.##.##.########.##.##.###",
  "###.##.##.########.##.##.###",
  "#......##....##....##......#",
  "#.##########.##.##########.#",
  "#.##########.##.##########.#",
  "#..........................#",
  "############################"
];
var PACMAN_DIRECTIONS = [[0, -1], [-1, 0], [0, 1], [1, 0]];
var PACMAN_PORTALS = [{ x: 1, z: 1 }, { x: 26, z: 29 }];
var ghostColors = ["#ff5262", "#ff9ed6", "#43dce5", "#ffb46b"];
var ghostNames = ["Blinky", "Pinky", "Inky", "Clyde"];
var same = (a, b) => a.x === b.x && a.z === b.z && a.y === b.y;
var key = (p) => `${p.x},${p.y},${p.z}`;
var copy = (p) => ({ x: p.x, y: p.y, z: p.z });
var PacmanEngine = class {
  constructor({ layers = 2, random = Math.random } = {}) {
    this.layers = Math.max(1, Math.min(3, layers));
    this.random = random;
    this.reset();
  }
  reset() {
    this.score = 0;
    this.lives = 3;
    this.level = 1;
    this.extraLife = false;
    this.loadLevel();
  }
  loadLevel() {
    this.pellets = /* @__PURE__ */ new Set();
    this.powerPills = /* @__PURE__ */ new Set();
    for (let y = 0; y < this.layers; y++) for (let z = 0; z < 31; z++) for (let x = 0; x < 28; x++) {
      if (PACMAN_MAZE[z][x] === ".") this.pellets.add(key({ x, y, z }));
      if (PACMAN_MAZE[z][x] === "o") this.powerPills.add(key({ x, y, z }));
    }
    this.initialPellets = this.pellets.size + this.powerPills.size;
    this.fruit = null;
    this.fruitTriggers = /* @__PURE__ */ new Set();
    this.events = [];
    this.respawn();
  }
  respawn() {
    this.player = { x: 13, y: 0, z: 23, dir: 1, wanted: 1 };
    this.previousPlayer = copy(this.player);
    this.ghosts = ghostNames.map((name, i) => ({ name, color: ghostColors[i], x: [13, 13, 14, 12][i], z: i === 0 ? 11 : 14, y: i === 0 ? 0 : i % this.layers, dir: i % 2 ? 3 : 1, returning: false, release: i === 0 ? 0 : 1 + i * 1.6, previous: { x: [13, 13, 14, 12][i], z: i === 0 ? 11 : 14, y: i === 0 ? 0 : i % this.layers } }));
    this.status = "ready";
    this.readyTime = 1.25;
    this.frightened = 0;
    this.ghostCombo = 0;
    this.modeClock = 0;
    this.mode = "scatter";
    this.tickClock = 0;
    this.tickCount = 0;
    this.invulnerable = 0;
  }
  passable(x, y, z, ghost2 = false) {
    if (y < 0 || y >= this.layers || x < 0 || x >= 28 || z < 0 || z >= 31) return false;
    const c = PACMAN_MAZE[z][x];
    return c !== "#" && (ghost2 || c !== "-" && !(x >= 11 && x <= 16 && z >= 13 && z <= 15));
  }
  neighbor(position, dir, ghost2 = false) {
    const [dx, dz] = PACMAN_DIRECTIONS[dir];
    let x = position.x + dx, z = position.z + dz;
    if (z === 14) {
      if (x < 0) x = 27;
      if (x > 27) x = 0;
    }
    return this.passable(x, position.y, z, ghost2) ? { x, y: position.y, z, dir } : null;
  }
  isPortal(p) {
    return this.layers > 1 && PACMAN_PORTALS.some((t) => t.x === p.x && t.z === p.z);
  }
  neighbors(p, ghost2 = false) {
    const results = PACMAN_DIRECTIONS.map((_, d) => this.neighbor(p, d, ghost2)).filter(Boolean);
    if (this.isPortal(p)) {
      for (const dy of [-1, 1]) if (p.y + dy >= 0 && p.y + dy < this.layers) results.push({ x: p.x, y: p.y + dy, z: p.z, dir: p.dir ?? 3, vertical: true });
    }
    return results;
  }
  setDirection(dir) {
    if (dir >= 0 && dir < 4) this.player.wanted = dir;
  }
  changeLayer(delta) {
    if (!["ready", "playing"].includes(this.status) || !this.isPortal(this.player) || this.player.y + delta < 0 || this.player.y + delta >= this.layers) return false;
    this.previousPlayer = copy(this.player);
    this.player.y += delta;
    this.previousPlayer = copy(this.player);
    this.eat();
    this.checkCollision();
    this.events.push("portal");
    return true;
  }
  addScore(points) {
    this.score += points;
    if (!this.extraLife && this.score >= 1e4) {
      this.lives++;
      this.extraLife = true;
      this.events.push("life");
    }
  }
  eat() {
    const id3 = key(this.player);
    if (this.pellets.delete(id3)) {
      this.addScore(10);
      this.events.push("pellet");
    }
    if (this.powerPills.delete(id3)) {
      this.addScore(50);
      this.frightened = Math.max(2, 7 - this.level * 0.4);
      this.ghostCombo = 0;
      for (const g of this.ghosts) if (!g.returning) g.dir = (g.dir + 2) % 4;
      this.events.push("power");
    }
    const eaten = this.initialPellets - this.pellets.size - this.powerPills.size;
    for (const threshold of [70, 170]) if (eaten >= threshold * this.layers && !this.fruitTriggers.has(threshold)) {
      this.fruitTriggers.add(threshold);
      this.fruit = { x: 13, y: this.player.y, z: 17, time: 10, points: [100, 300, 500, 700, 1e3][Math.min(4, this.level - 1)] };
    }
    if (this.fruit && same(this.fruit, this.player)) {
      this.addScore(this.fruit.points);
      this.fruit = null;
      this.events.push("fruit");
    }
    if (this.pellets.size + this.powerPills.size === 0) {
      this.status = "won";
      this.events.push("win");
    }
  }
  nextLevel() {
    if (this.status === "won") {
      this.level++;
      this.loadLevel();
      return true;
    }
    return false;
  }
  loseLife() {
    if (this.status !== "playing") return;
    this.lives--;
    this.events.push("death");
    if (this.lives <= 0) this.status = "gameover";
    else this.respawn();
  }
  checkCollision(previousPlayer = null) {
    if (this.status !== "playing" || this.invulnerable > 0) return;
    for (const g of this.ghosts) {
      const crossed = previousPlayer && g.previous && same(g, previousPlayer) && same(g.previous, this.player);
      if (!g.returning && g.release <= 0 && (same(g, this.player) || crossed)) {
        if (this.frightened > 0) {
          g.returning = true;
          this.addScore(200 * Math.pow(2, Math.min(this.ghostCombo++, 3)));
          this.events.push("ghost");
        } else {
          this.loseLife();
          return;
        }
      }
    }
  }
  targetFor(g, index) {
    if (g.returning) return { x: 13, y: g.y, z: 14 };
    if (g.release > 0 || g.x >= 11 && g.x <= 16 && g.z >= 12 && g.z <= 15) return { x: 13, y: g.y, z: 11 };
    const corners = [{ x: 26, z: 1 }, { x: 1, z: 1 }, { x: 26, z: 29 }, { x: 1, z: 29 }];
    if (this.mode === "scatter") return { ...corners[index], y: g.y };
    const p = this.player, [dx, dz] = PACMAN_DIRECTIONS[p.dir];
    if (index === 0) return copy(p);
    if (index === 1) return { x: p.x + dx * 4, y: p.y, z: p.z + dz * 4 };
    if (index === 2) {
      const red = this.ghosts[0];
      return { x: (p.x + dx * 2) * 2 - red.x, y: p.y, z: (p.z + dz * 2) * 2 - red.z };
    }
    return Math.hypot(g.x - p.x, g.z - p.z) > 8 ? copy(p) : { ...corners[3], y: g.y };
  }
  moveGhost(g, index) {
    g.previous = copy(g);
    if (g.release > 0) return;
    if (this.frightened > 0 && !g.returning && this.tickCount % 2 === 0) return;
    let options = this.neighbors(g, true), target = this.targetFor(g, index);
    if (options.length > 1) {
      const forward = options.filter((n) => n.vertical || n.dir !== (g.dir + 2) % 4);
      if (forward.length) options = forward;
    }
    if (!options.length) return;
    let selected;
    if (this.frightened > 0 && !g.returning) selected = options[Math.floor(this.random() * options.length)];
    else {
      if (target.y !== g.y) {
        if (this.isPortal(g)) {
          selected = options.find((n) => n.y === g.y + Math.sign(target.y - g.y));
        }
        const portal = PACMAN_PORTALS.slice().sort((a, b) => Math.hypot(g.x - a.x, g.z - a.z) - Math.hypot(g.x - b.x, g.z - b.z))[0];
        target = { ...portal, y: g.y };
      }
      if (!selected) selected = options.reduce((best, n) => {
        const cost = (p) => Math.pow(p.x - target.x, 2) + Math.pow(p.z - target.z, 2) + Math.pow((p.y - target.y) * 30, 2);
        return cost(n) < cost(best) ? n : best;
      });
    }
    Object.assign(g, selected);
    if (g.returning && g.x === 13 && g.z === 14) {
      g.returning = false;
      g.release = 1.5;
    }
  }
  step() {
    if (this.status !== "playing") return;
    this.tickCount++;
    this.previousPlayer = copy(this.player);
    const intended = this.neighbor(this.player, this.player.wanted);
    const destination = intended || this.neighbor(this.player, this.player.dir);
    if (destination) Object.assign(this.player, destination);
    this.eat();
    if (this.status !== "playing") return;
    this.checkCollision();
    if (this.status !== "playing") return;
    for (let i = 0; i < this.ghosts.length; i++) this.moveGhost(this.ghosts[i], i);
    this.checkCollision(this.previousPlayer);
  }
  update(dt) {
    if (this.status === "ready") {
      this.readyTime -= dt;
      if (this.readyTime <= 0) this.status = "playing";
      return false;
    }
    if (this.status !== "playing") return false;
    this.frightened = Math.max(0, this.frightened - dt);
    this.invulnerable = Math.max(0, this.invulnerable - dt);
    if (this.fruit) {
      this.fruit.time -= dt;
      if (this.fruit.time <= 0) this.fruit = null;
    }
    for (const g of this.ghosts) g.release = Math.max(0, g.release - dt);
    if (this.frightened <= 0) {
      const before = this.mode;
      this.modeClock += dt;
      const t = this.modeClock % 27;
      this.mode = t < 7 ? "scatter" : "chase";
      if (before !== this.mode) for (const g of this.ghosts) g.dir = (g.dir + 2) % 4;
    }
    this.tickClock += dt;
    const period = Math.max(0.105, 0.17 - (this.level - 1) * 9e-3);
    let changed = false;
    while (this.tickClock >= period && this.status === "playing") {
      this.tickClock -= period;
      this.step();
      changed = true;
    }
    return changed;
  }
  snapshot() {
    return { layers: this.layers, score: this.score, lives: this.lives, level: this.level, status: this.status, mode: this.mode, frightened: this.frightened, player: { ...this.player }, ghosts: this.ghosts.map((g) => ({ ...g, previous: { ...g.previous } })), remaining: this.pellets.size + this.powerPills.size, pellets: [...this.pellets], powerPills: [...this.powerPills], fruit: this.fruit ? { ...this.fruit } : null };
  }
};
var VOLUME_DIRECTIONS = [[1, 0, 0], [-1, 0, 0], [0, 1, 0], [0, -1, 0], [0, 0, 1], [0, 0, -1]];
var VOLUME_PLANES = {
  xy: { right: [1, 0, 0], up: [0, 1, 0], normal: [0, 0, 1], axis: "z" },
  xz: { right: [1, 0, 0], up: [0, 0, -1], normal: [0, 1, 0], axis: "y" },
  yz: { right: [0, 0, -1], up: [0, 1, 0], normal: [1, 0, 0], axis: "x" }
};
function directionIndex(vector) {
  return VOLUME_DIRECTIONS.findIndex((d) => d.every((v, i) => v === vector[i]));
}
var manhattan = (a, b) => Math.abs(a.x - b.x) + Math.abs(a.y - b.y) + Math.abs(a.z - b.z);
function seededRandom(seed) {
  let n = seed >>> 0;
  return () => {
    n += 1831565813;
    let t = n;
    t = Math.imul(t ^ t >>> 15, t | 1);
    t ^= t + Math.imul(t ^ t >>> 7, t | 61);
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  };
}
function validatePacmanDimensions(values = 10) {
  const source = typeof values === "number" ? { x: values, y: values, z: values } : values;
  const dimensions = { x: Number(source.x), y: Number(source.y), z: Number(source.z) };
  if (Object.values(dimensions).some((n) => !Number.isSafeInteger(n) || n < 1)) throw new RangeError("X / Y / Z must be positive whole numbers.");
  if (dimensions.x * dimensions.y * dimensions.z > 32768) throw new RangeError("Maximum volume: 32,768 cells. Reduce one axis.");
  return dimensions;
}
function generateVolumeMaze(dimensions = 10, seed = 7463) {
  const d = validatePacmanDimensions(dimensions), random = seededRandom(seed), cells = /* @__PURE__ */ new Set(), rooms = [];
  const low = {}, high = {}, middle = {};
  for (const axis of ["x", "y", "z"]) {
    low[axis] = d[axis] > 3 ? 1 : 0;
    high[axis] = d[axis] > 3 ? d[axis] - 2 : d[axis] - 1;
    const span = high[axis] - low[axis];
    middle[axis] = low[axis] + Math.round(span * (0.4 + random() * 0.2));
  }
  const line2 = (a, b) => {
    const axis = ["x", "y", "z"].find((k) => a[k] !== b[k]);
    if (!axis) {
      cells.add(key(a));
      return;
    }
    const sign = Math.sign(b[axis] - a[axis]);
    for (let value = a[axis]; value !== b[axis] + sign; value += sign) cells.add(key({ ...a, [axis]: value }));
  };
  for (const fixed of ["x", "y", "z"]) {
    const [a, b] = ["x", "y", "z"].filter((k) => k !== fixed), corners = [[low[a], low[b]], [high[a], low[b]], [high[a], high[b]], [low[a], high[b]]].map(([av, bv]) => ({ [a]: av, [b]: bv, [fixed]: middle[fixed] }));
    for (let i = 0; i < 4; i++) line2(corners[i], corners[(i + 1) % 4]);
  }
  for (const axis of ["x", "y", "z"]) line2({ ...middle, [axis]: low[axis] }, { ...middle, [axis]: high[axis] });
  for (const id3 of cells) {
    const [x, y, z] = id3.split(",").map(Number);
    rooms.push({ x, y, z });
  }
  const start = { x: middle.x, y: middle.y, z: high.z };
  return { size: d.x, dimensions: d, cells, rooms, start, low, high, middle, seed };
}
var VolumePacmanEngine = class {
  constructor({ size = 10, dimensions = null, width, height, depth, seed = 7463, random = Math.random, firstPerson = false, variant = null } = {}) {
    this.dimensions = validatePacmanDimensions(dimensions ?? { x: width ?? size, y: height ?? size, z: depth ?? size });
    this.size = this.dimensions.x;
    this.seed = seed;
    this.random = random;
    this.variant = variant;
    this.firstPerson = firstPerson || variant === "a";
    this.reset();
  }
  reset() {
    this.score = 0;
    this.lives = 3;
    this.level = 1;
    this.extraLife = false;
    this.loadLevel();
  }
  loadLevel() {
    this.maze = (this.variant === "b" ? generateExplorerMaze : generateVolumeMaze)(this.dimensions, this.seed + this.level * 397);
    this.cells = this.maze.cells;
    this.start = { ...this.maze.start };
    const distant = this.maze.rooms.filter((p) => manhattan(p, this.start) >= Math.min(3, Math.max(...Object.values(this.dimensions)) - 1)).sort((a, b) => manhattan(b, this.start) - manhattan(a, this.start));
    this.homes = [];
    if (this.cells.size >= 12) for (const p of distant) {
      if (this.homes.every((home) => manhattan(p, home) >= 3)) this.homes.push(copy(p));
      if (this.homes.length === 4) break;
    }
    this.pellets = new Set([...this.cells].filter((id3) => {
      const [x, y, z] = id3.split(",").map(Number);
      return (x + y + z) % 2 === 0;
    }));
    this.pellets.delete(key(this.start));
    this.powerPills = new Set(this.homes.map(key));
    for (const id3 of this.powerPills) this.pellets.delete(id3);
    if (!this.pellets.size && !this.powerPills.size && this.cells.size > 1) this.pellets.add([...this.cells].find((id3) => id3 !== key(this.start)));
    this.initialPellets = this.pellets.size + this.powerPills.size;
    this.fruit = null;
    this.fruitTriggers = /* @__PURE__ */ new Set();
    this.events = [];
    this.respawn();
  }
  respawn() {
    const first = this.neighbors(this.start).find((n) => n.dir === 1)?.dir ?? this.neighbors(this.start)[0]?.dir ?? 0;
    this.player = { ...this.start, dir: first, wanted: first };
    this.previousPlayer = copy(this.player);
    this.heading = pacmanInitialFrame(VOLUME_DIRECTIONS[first]);
    this.pendingTurns = [];
    this.route = [];
    this.routeTarget = null;
    this.pendingTarget = null;
    this.crossingTime = 0;
    this.ghosts = this.homes.map((home, i) => ({ ...home, name: ghostNames[i], color: ghostColors[i], dir: 1, returning: false, release: 3 + i * 2, previous: copy(home) }));
    this.status = this.initialPellets ? "ready" : "won";
    this.readyTime = 1.25;
    this.frightened = 0;
    this.ghostCombo = 0;
    this.modeClock = 0;
    this.mode = "scatter";
    this.tickClock = 0;
    this.tickCount = 0;
    this.invulnerable = 0;
  }
  passable(x, y, z) {
    return this.cells.has(key({ x, y, z }));
  }
  neighbor(p, dir) {
    if (!Number.isInteger(dir) || !VOLUME_DIRECTIONS[dir]) return null;
    const [dx, dy, dz] = VOLUME_DIRECTIONS[dir], q = { x: p.x + dx, y: p.y + dy, z: p.z + dz, dir };
    return this.passable(q.x, q.y, q.z) ? q : null;
  }
  neighbors(p) {
    return VOLUME_DIRECTIONS.map((_, dir) => this.neighbor(p, dir)).filter(Boolean);
  }
  setDirection(dir) {
    if (Number.isInteger(dir) && dir >= 0 && dir < 6) this.player.wanted = dir;
  }
  setVector(vector) {
    const dir = directionIndex(vector);
    if (dir < 0) return false;
    this.setDirection(dir);
    return true;
  }
  turn(input) {
    const name = pacmanTurnName(input);
    if (!name || !["ready", "playing"].includes(this.status)) return false;
    if (this.status === "playing" && this.tickClock > 1e-8 && this.neighbor(this.player, this.player.dir)) {
      if (this.pendingTurns.length >= 4) return false;
      this.pendingTurns.push(name);
    } else {
      this.applyTurn(name);
      this.tickClock = 0;
    }
    return true;
  }
  applyTurn(input) {
    const pitch = ["up", "down"].includes(pacmanTurnName(input));
    this.heading = pacmanTurnFrame(this.heading, input);
    this.player.dir = this.player.wanted = directionIndex(this.heading.forward);
    if (this.variant === "a" && pitch && this.neighbor(this.player, this.player.dir)) this.crossingTime = 1.35;
  }
  setTarget(target) {
    if (this.variant !== "b" || !["ready", "playing"].includes(this.status) || !this.passable(target.x, target.y, target.z)) return false;
    const inFlight = this.status === "playing" && this.tickClock > 1e-8 ? this.neighbor(this.player, this.player.dir) : null;
    const route = pacmanPath(this.cells, inFlight ?? this.player, target);
    if (!route) return false;
    this.routeTarget = copy(target);
    if (inFlight) this.pendingTarget = copy(target);
    else {
      this.route = route;
      this.pendingTarget = null;
      this.aimRoute();
    }
    return true;
  }
  aimRoute() {
    while (this.route.length && same(this.route[0], this.player)) this.route.shift();
    const next = this.route[0];
    if (!next) return;
    const vector = [next.x - this.player.x, next.y - this.player.y, next.z - this.player.z];
    const dir = directionIndex(vector);
    if (dir >= 0) {
      this.player.dir = this.player.wanted = dir;
      this.heading = pacmanInitialFrame(vector);
    }
  }
  playerPose() {
    if (!this.firstPerson && this.variant !== "b") return copy(this.player);
    const next = this.status === "playing" ? this.neighbor(this.player, this.player.dir) : null;
    const alpha = next ? Math.min(1, this.tickClock / this.period) : 0;
    return { x: this.player.x + (next ? next.x - this.player.x : 0) * alpha, y: this.player.y + (next ? next.y - this.player.y : 0) * alpha, z: this.player.z + (next ? next.z - this.player.z : 0) * alpha };
  }
  addScore(points) {
    this.score += points;
    if (!this.extraLife && this.score >= 1e4) {
      this.lives++;
      this.extraLife = true;
      this.events.push("life");
    }
  }
  eat() {
    const id3 = key(this.player);
    if (this.pellets.delete(id3)) {
      this.addScore(10);
      this.events.push("pellet");
    }
    if (this.powerPills.delete(id3)) {
      this.addScore(50);
      this.frightened = Math.max(2, 7 - this.level * 0.4);
      this.ghostCombo = 0;
      for (const g of this.ghosts) if (!g.returning) g.dir ^= 1;
      this.events.push("power");
    }
    const count = this.initialPellets - this.pellets.size - this.powerPills.size;
    for (const portion of [0.3, 0.7]) if (count >= Math.floor(this.initialPellets * portion) && !this.fruitTriggers.has(portion)) {
      this.fruitTriggers.add(portion);
      const room = this.maze.rooms[Math.floor(this.maze.rooms.length / 2)];
      this.fruit = { ...room, time: 12, points: 100 * this.level };
    }
    if (this.fruit && same(this.player, this.fruit)) {
      this.addScore(this.fruit.points);
      this.fruit = null;
      this.events.push("fruit");
    }
    if (!this.pellets.size && !this.powerPills.size) {
      this.status = "won";
      this.events.push("win");
    }
  }
  nextLevel() {
    if (this.status !== "won") return false;
    this.level++;
    this.loadLevel();
    return true;
  }
  loseLife() {
    if (this.status !== "playing") return;
    this.lives--;
    this.events.push("death");
    if (this.lives <= 0) this.status = "gameover";
    else this.respawn();
  }
  checkCollision(previousPlayer = null) {
    if (this.status !== "playing" || this.invulnerable > 0) return;
    for (const g of this.ghosts) {
      const crossed = previousPlayer && g.previous && same(g, previousPlayer) && same(g.previous, this.player);
      if (!g.returning && g.release <= 0 && (same(g, this.player) || crossed)) {
        if (this.frightened > 0) {
          g.returning = true;
          this.addScore(200 * 2 ** Math.min(this.ghostCombo++, 3));
          this.events.push("ghost");
        } else {
          this.loseLife();
          return;
        }
      }
    }
  }
  targetFor(g, index) {
    if (g.returning) return this.homes[index];
    if (this.mode === "scatter") return this.homes[(index + 1) % this.homes.length];
    const p = this.player, [dx, dy, dz] = VOLUME_DIRECTIONS[p.dir];
    if (index === 0) return copy(p);
    if (index === 1) return { x: p.x + dx * 3, y: p.y + dy * 3, z: p.z + dz * 3 };
    if (index === 2) {
      const red = this.ghosts[0];
      return { x: (p.x + dx * 2) * 2 - red.x, y: (p.y + dy * 2) * 2 - red.y, z: (p.z + dz * 2) * 2 - red.z };
    }
    return manhattan(g, p) > 5 ? copy(p) : this.homes[index];
  }
  distancesTo(target) {
    let closest = null, best = Infinity;
    for (const id3 of this.cells) {
      const [x, y, z] = id3.split(",").map(Number), p = { x, y, z }, distance = manhattan(p, target);
      if (distance < best) {
        best = distance;
        closest = p;
        if (!distance) break;
      }
    }
    const distances = /* @__PURE__ */ new Map([[key(closest), 0]]), queue = [closest];
    for (let i = 0; i < queue.length; i++) for (const n of this.neighbors(queue[i])) if (!distances.has(key(n))) {
      distances.set(key(n), distances.get(key(queue[i])) + 1);
      queue.push(n);
    }
    return distances;
  }
  moveGhost(g, index) {
    g.previous = copy(g);
    if (g.release > 0 || this.frightened > 0 && !g.returning && this.tickCount % 2 === 0) return;
    let options = this.neighbors(g);
    if (options.length > 1 && !g.returning) {
      const noReverse = options.filter((n) => n.dir !== (g.dir ^ 1));
      if (noReverse.length) options = noReverse;
    }
    if (!options.length) return;
    let chosen;
    if (this.frightened > 0 && !g.returning) chosen = options[Math.floor(this.random() * options.length)];
    else {
      const distances = this.distancesTo(this.targetFor(g, index));
      chosen = options.reduce((a, b) => (distances.get(key(b)) ?? Infinity) < (distances.get(key(a)) ?? Infinity) ? b : a);
    }
    Object.assign(g, chosen);
    if (g.returning && same(g, this.homes[index])) {
      g.returning = false;
      g.release = 1.5;
    }
  }
  step() {
    if (this.status !== "playing") return;
    this.tickCount++;
    this.previousPlayer = copy(this.player);
    const destination = this.firstPerson || this.variant === "b" ? this.neighbor(this.player, this.player.dir) : this.neighbor(this.player, this.player.wanted) || this.neighbor(this.player, this.player.dir);
    if (destination) Object.assign(this.player, destination);
    if (this.variant === "b") {
      if (this.pendingTarget) {
        this.route = pacmanPath(this.cells, this.player, this.pendingTarget) ?? [];
        this.pendingTarget = null;
      }
      this.aimRoute();
      if (this.routeTarget && same(this.routeTarget, this.player)) {
        this.routeTarget = null;
        this.route = [];
      }
    }
    this.eat();
    if (this.status !== "playing") return;
    this.checkCollision();
    if (this.status !== "playing") return;
    this.ghosts.forEach((g, i) => this.moveGhost(g, i));
    this.checkCollision(this.previousPlayer);
    if (this.status === "playing") for (const turn of this.pendingTurns.splice(0)) this.applyTurn(turn);
  }
  get period() {
    return this.variant === "a" ? Math.max(0.32, 0.46 - (this.level - 1) * 0.012) : Math.max(0.15, 0.24 - (this.level - 1) * 0.012);
  }
  get transition() {
    return Math.sin(Math.PI * Math.max(0, Math.min(1, this.crossingTime / 1.35)));
  }
  get simulationSpeed() {
    return this.variant === "a" ? 1 - 0.4 * this.transition : 1;
  }
  update(dt) {
    if (this.status === "ready") {
      this.readyTime -= dt;
      if (this.readyTime <= 0) this.status = "playing";
      return false;
    }
    if (this.status !== "playing") return false;
    const speed = this.simulationSpeed;
    this.crossingTime = Math.max(0, this.crossingTime - dt);
    dt *= speed;
    this.frightened = Math.max(0, this.frightened - dt);
    this.invulnerable = Math.max(0, this.invulnerable - dt);
    if (this.fruit) {
      this.fruit.time -= dt;
      if (this.fruit.time <= 0) this.fruit = null;
    }
    for (const g of this.ghosts) g.release = Math.max(0, g.release - dt);
    if (!this.frightened) {
      const before = this.mode;
      this.modeClock += dt;
      this.mode = this.modeClock % 27 < 7 ? "scatter" : "chase";
      if (before !== this.mode) for (const g of this.ghosts) g.dir ^= 1;
    }
    this.tickClock += dt;
    let changed = false;
    while (this.tickClock >= this.period && this.status === "playing") {
      this.tickClock -= this.period;
      this.step();
      changed = true;
    }
    return changed;
  }
  snapshot() {
    return { size: this.size, dimensions: [this.dimensions.x, this.dimensions.y, this.dimensions.z], score: this.score, lives: this.lives, level: this.level, status: this.status, mode: this.mode, frightened: this.frightened, player: { ...this.player }, pose: this.playerPose(), heading: { forward: [...this.heading.forward], up: [...this.heading.up], right: [...this.heading.right] }, pendingTurns: [...this.pendingTurns], variant: this.variant, route: this.route.map(copy), routeTarget: this.routeTarget ? copy(this.routeTarget) : null, transition: this.transition, simulationSpeed: this.simulationSpeed, period: this.period, blocked: !this.neighbor(this.player, this.player.dir), ghosts: this.ghosts.map((g) => ({ ...g, previous: { ...g.previous } })), remaining: this.pellets.size + this.powerPills.size, pellets: [...this.pellets], powerPills: [...this.powerPills], cells: [...this.cells], fruit: this.fruit ? { ...this.fruit } : null };
  }
};
function createGame3(ctx) {
  const THREE4 = ctx.THREE, world = new THREE4.Group(), geometries = /* @__PURE__ */ new Set(), materials = /* @__PURE__ */ new Set(), levelMeshes = [], pelletMeshes = /* @__PURE__ */ new Map();
  world.name = "pacman-world";
  ctx.group.add(world);
  let mode = "spatial", dimensions = { x: 10, y: 10, z: 10 }, engine, clock = 0, disposed = false, lastMetrics = "", lastMessage = "", lastPelletCount = -1, viewMode = "chase", inspection = null, variant = "a", lastArchitecture = "", lastDt = 1 / 60, wallPanels = [], pipes = null, started = false, viewUp = [0, 1, 0], roundDetails = null;
  const geo = (g) => (geometries.add(g), g), mat = (opts) => {
    const m = new THREE4.MeshStandardMaterial(opts);
    materials.add(m);
    return m;
  };
  const box = geo(new THREE4.BoxGeometry(1, 1, 1)), dot2 = geo(new THREE4.SphereGeometry(0.12, 8, 6)), power = geo(new THREE4.SphereGeometry(0.23, 12, 8));
  const yellow = mat({ color: "#ffdf39", emissive: "#a16c00", emissiveIntensity: 0.28, roughness: 0.5 }), white = mat({ color: "#fff7e9", roughness: 0.5 }), pupil = mat({ color: "#172765" }), blue = mat({ color: "#225be4", emissive: "#1948dd", emissiveIntensity: 0.32, roughness: 0.55 }), cream = mat({ color: "#ffe9c2", emissive: "#bd8955", emissiveIntensity: 0.32 }), fright = mat({ color: "#294cdd", emissive: "#16309c", emissiveIntensity: 0.3 });
  const temp = new THREE4.Object3D(), directionVector = new THREE4.Vector3(), localRight = new THREE4.Vector3(1, 0, 0);
  const playerMesh = new THREE4.Group();
  playerMesh.name = "pacman-player";
  const mouth = new THREE4.Mesh(geo(new THREE4.SphereGeometry(0.39, 20, 14, Math.PI + 0.34, Math.PI * 2 - 0.68)), yellow);
  mouth.rotation.x = Math.PI / 2;
  playerMesh.add(mouth);
  const eye = new THREE4.Mesh(geo(new THREE4.SphereGeometry(0.046, 8, 6)), pupil);
  eye.position.set(0.08, 0.23, 0.25);
  playerMesh.add(eye);
  world.add(playerMesh);
  const ghosts = ghostColors.map((color, index) => {
    const root = new THREE4.Group(), colorMat = mat({ color, emissive: color, emissiveIntensity: 0.15, roughness: 0.5 }), body = [];
    root.name = `pacman-ghost-${index}`;
    const cap = new THREE4.Mesh(geo(new THREE4.SphereGeometry(0.35, 14, 9, 0, Math.PI * 2, 0, Math.PI / 2)), colorMat);
    cap.position.y = 0.12;
    root.add(cap);
    body.push(cap);
    const skirt = new THREE4.Mesh(geo(new THREE4.CylinderGeometry(0.35, 0.35, 0.36, 14, 1, true)), colorMat);
    skirt.position.y = -0.06;
    root.add(skirt);
    body.push(skirt);
    for (let i = 0; i < 5; i++) {
      const foot = new THREE4.Mesh(geo(new THREE4.SphereGeometry(0.09, 8, 5)), colorMat);
      foot.position.set((i - 2) * 0.14, -0.25, 0.03);
      root.add(foot);
      body.push(foot);
    }
    for (const x of [-0.14, 0.14]) {
      const eyeball = new THREE4.Mesh(geo(new THREE4.SphereGeometry(0.1, 10, 7)), white);
      eyeball.scale.set(1, 1.25, 0.6);
      eyeball.position.set(x, 0.14, 0.32);
      root.add(eyeball);
      const iris = new THREE4.Mesh(geo(new THREE4.SphereGeometry(0.046, 8, 6)), pupil);
      iris.position.set(x, 0.14, 0.38);
      root.add(iris);
    }
    world.add(root);
    return { root, colorMat, body };
  });
  const fruit = new THREE4.Mesh(geo(new THREE4.SphereGeometry(0.21, 10, 7)), mat({ color: "#ee395b", emissive: "#a92342", emissiveIntensity: 0.15, roughness: 0.3 }));
  fruit.name = "pacman-fruit";
  world.add(fruit);
  const targetMarker = new THREE4.Mesh(geo(new THREE4.OctahedronGeometry(0.52)), mat({ color: "#ffeb7c", emissive: "#ffce4a", emissiveIntensity: 0.6, wireframe: true, depthTest: false }));
  targetMarker.name = "pacman-target";
  targetMarker.renderOrder = 90;
  targetMarker.visible = false;
  world.add(targetMarker);
  const routeGeometry = geo(new THREE4.BufferGeometry()), routeMaterial = new THREE4.LineBasicMaterial({ color: "#ffe17b", transparent: true, opacity: 0.85, depthTest: false });
  materials.add(routeMaterial);
  const routeMesh = new THREE4.Line(routeGeometry, routeMaterial);
  routeMesh.name = "pacman-route-preview";
  routeMesh.renderOrder = 80;
  world.add(routeMesh);
  let lastRoute = "";
  const headlight = new THREE4.PointLight("#fff1ce", 8, 8, 1.5);
  headlight.name = "pacman-headlight";
  world.add(headlight);
  const rimLight = new THREE4.PointLight("#76d9c6", 2.3, 7, 1.7);
  rimLight.name = "pacman-route-light";
  world.add(rimLight);
  const studGeometry = geo(new THREE4.SphereGeometry(0.04, 8, 5)), studMaterial = mat({ color: "#9ce7d4", emissive: "#4dba9c", emissiveIntensity: 0.65, roughness: 0.35 });
  const toWorld = (p) => mode === "spatial" ? [p.x - (dimensions.x - 1) / 2, p.y - (dimensions.y - 1) / 2, p.z - (dimensions.z - 1) / 2] : [p.x - 13.5, 15 - p.z, 0.08];
  const setPosition = (mesh, p) => {
    mesh.position.set(...toWorld(p));
    mesh.userData.pickData = copy(p);
  }, el = (s) => ctx.ui.querySelector(s);
  ctx.ui.innerHTML = '<div class="control-group"><label>Play style <select data-mode><option value="spatial">A \xB7 Chase</option><option value="explorer">B \xB7 Click & Go</option><option value="classic">2D \xB7 Classic</option></select></label></div><div class="control-group"><div data-direction-controls class="control-row"><button class="small-button" data-key="arrowup" title="Pitch up \xB7 W">\u2191</button><button class="small-button" data-key="arrowleft" title="Turn left \xB7 A">\u2190</button><button class="small-button" data-key="arrowdown" title="Pitch down \xB7 S">\u2193</button><button class="small-button" data-key="arrowright" title="Turn right \xB7 D">\u2192</button></div><div data-view-controls class="control-row"><button class="small-button" data-pilot title="Follow player" aria-label="Follow player">\u25C9</button><button class="small-button" data-overview title="Overview" aria-label="Overview">\u25CE</button></div><div class="control-row"><button class="primary-button" data-next disabled aria-label="Next level">\u25B6\u25B6</button><button class="small-button" data-reset aria-label="Restart">\u21BA</button></div></div>';
  function disposeLevel() {
    if (pipes) {
      world.remove(pipes.group);
      pipes.dispose();
      pipes = null;
    }
    roundDetails = null;
    for (const mesh of levelMeshes) {
      world.remove(mesh);
      if (mesh.isInstancedMesh) mesh.dispose();
      if (mesh.userData.ownGeometry) {
        geometries.delete(mesh.geometry);
        mesh.geometry.dispose();
      }
      if (mesh.isLineSegments) {
        materials.delete(mesh.material);
        mesh.material.dispose();
      }
    }
    levelMeshes.length = 0;
    pelletMeshes.clear();
  }
  function addLevelMesh(mesh, name) {
    mesh.name = name;
    world.add(mesh);
    levelMeshes.push(mesh);
    return mesh;
  }
  function followPlayer() {
    if (mode !== "spatial" || variant !== "a" || viewMode !== "chase") return;
    const position = toWorld(engine.playerPose()), { forward, up } = engine.heading, transition = engine.transition;
    headlight.position.set(...position);
    rimLight.position.set(...position.map((n, i) => n + forward[i] * 2.8 + up[i] * 0.22));
    if (ctx.spatial?.chase) ctx.spatial.chase({ position, forward: [...forward], up: [...up], dt: lastDt, transition, distance: PACMAN_CHASE.distance + PACMAN_CHASE.pullback * transition, height: PACMAN_CHASE.height + PACMAN_CHASE.lift * transition, side: PACMAN_CHASE.side * transition, fov: PACMAN_CHASE.fov + 4 * transition, near: 0.06 });
    else ctx.frame({ target: position.map((n, i) => n + forward[i] * 0.65), up: [...up], position: position.map((n, i) => n - forward[i] * PACMAN_CHASE.distance + up[i] * PACMAN_CHASE.height) });
  }
  function initialiseCamera() {
    if (mode === "spatial") {
      if (variant === "a") {
        viewMode = "chase";
        followPlayer();
      } else {
        viewMode = "overview";
        ctx.spatial?.overview?.({ target: [0, 0, 0], distance: Math.max(...Object.values(dimensions)) * 1.55 });
      }
    } else if (ctx.spatial?.focus) ctx.spatial.focus({ plane: "xy", target: [0, 0, 0], distance: 48, animate: false });
    else ctx.frame({ target: [0, 0, 0], distance: 48, position: [0, 0, 48] });
  }
  function onView(view = "overview") {
    if (mode !== "spatial") {
      ctx.spatial?.focus?.({ plane: "xy", target: [0, 0, 0], distance: 48, animate: false });
      return;
    }
    viewMode = variant === "a" && ["first-person", "pilot", "play", "chase"].includes(view) ? "chase" : "overview";
    if (viewMode === "chase") {
      inspection = null;
      followPlayer();
    }
    lastArchitecture = "";
    draw(true);
  }
  function updateArchitecture(force = false) {
    if (mode !== "spatial") return;
    const architecture = variant === "b" ? "b" : `${viewMode}:${key(engine.player)}:${engine.heading.forward}:${engine.heading.up}`;
    if (!force && architecture === lastArchitecture) return;
    lastArchitecture = architecture;
    const voxels2 = [], studs = [];
    if (variant === "b") {
    } else {
      const player = engine.player, { forward, up } = engine.heading;
      for (const panel of wallPanels) {
        const delta = panel.position.map((n, i) => n - [player.x, player.y, player.z][i]), near = Math.hypot(...delta) < 6.7;
        const facing = panel.normal.reduce((sum, n, i) => sum + n * (-forward[i] * 0.85 + up[i]), 0);
        if (viewMode === "chase" && near && (facing > 0.12 || pacmanCameraCutaway(panel, player, engine.heading))) continue;
        const p = panel.position, w = toWorld({ x: p[0], y: p[1], z: p[2] }), [sx, sy, sz] = panel.scale;
        const palette = { wall: "#183b4b", floor: "#163044", ceiling: "#102535" };
        voxels2.push({ x: w[0], y: w[1], z: w[2], sx, sy, sz, color: palette[panel.surface], opacity: 1, data: { ...panel.cell, surface: panel.surface, normal: panel.normal } });
        const trimPosition = w.map((n, i) => n - panel.normal[i] * 0.046), trimScale = [...panel.scale], axis = ["x", "y", "z"].indexOf(panel.axis);
        trimScale[axis] = 0.014;
        for (let i = 0; i < 3; i++) if (i !== axis) trimScale[i] = 0.81;
        if (panel.surface === "wall") {
          const insetScale = [...trimScale];
          insetScale[1] = 0.55;
          voxels2.push({ x: trimPosition[0], y: trimPosition[1] + 0.035, z: trimPosition[2], sx: insetScale[0], sy: insetScale[1], sz: insetScale[2], color: "#285e67", opacity: 1, data: { ...panel.cell, surface: "wall-inset" } });
          trimPosition[1] -= 0.32;
          trimScale[1] = 0.028;
          voxels2.push({ x: trimPosition[0], y: trimPosition[1], z: trimPosition[2], sx: trimScale[0], sy: trimScale[1], sz: trimScale[2], color: "#ffd184", opacity: 1, data: { ...panel.cell, surface: "sill" } });
        } else if (panel.surface === "floor") {
          voxels2.push({ x: trimPosition[0], y: trimPosition[1], z: trimPosition[2], sx: trimScale[0], sy: trimScale[1], sz: trimScale[2], color: "#23545f", opacity: 1, data: { ...panel.cell, surface: "floor-tile" } });
          for (const sign of [-1, 1]) {
            voxels2.push({ x: w[0], y: trimPosition[1] + 0.012, z: w[2] + sign * 0.32, sx: 0.84, sy: 0.015, sz: 0.024, color: "#e9bc76", opacity: 1, data: { ...panel.cell, surface: "route-strip" } });
            studs.push({ position: [w[0] + sign * 0.34, trimPosition[1] + 0.025, w[2] + sign * 0.34], cell: panel.cell });
          }
        }
      }
    }
    ctx.setVoxels(voxels2);
    if (roundDetails) {
      roundDetails.count = studs.length;
      roundDetails.userData.pickCells = studs.map((stud) => ({ ...stud.cell }));
      studs.forEach((stud, i) => {
        temp.position.fromArray(stud.position);
        temp.scale.setScalar(1);
        temp.quaternion.identity();
        temp.updateMatrix();
        roundDetails.setMatrixAt(i, temp.matrix);
      });
      roundDetails.instanceMatrix.needsUpdate = true;
      roundDetails.computeBoundingSphere();
    }
  }
  function buildMaze() {
    disposeLevel();
    lastPelletCount = -1;
    lastMetrics = "";
    lastMessage = "";
    if (mode === "spatial") {
      wallPanels = pacmanWallPanels(engine.cells);
      lastArchitecture = "";
      if (variant === "b") {
        pipes = createPacmanPipes(THREE4, { cells: engine.cells, dimensions, toWorld });
        world.add(pipes.group);
        pipes.update(viewUp, 0, { immediate: true });
      } else roundDetails = addLevelMesh(new THREE4.InstancedMesh(studGeometry, studMaterial, wallPanels.length * 2), "pacman-round-deck-lights");
      updateArchitecture(true);
    } else {
      ctx.setVoxels([]);
      const walls = [];
      for (let z = 0; z < 31; z++) for (let x = 0; x < 28; x++) if (PACMAN_MAZE[z][x] === "#") walls.push({ x, y: 0, z });
      const maze = addLevelMesh(new THREE4.InstancedMesh(box, blue, walls.length), "pacman-classic-walls");
      walls.forEach((p, i) => {
        temp.position.set(...toWorld(p));
        temp.position.z = -0.2;
        temp.scale.set(0.94, 0.94, 0.4);
        temp.updateMatrix();
        maze.setMatrixAt(i, temp.matrix);
      });
      maze.instanceMatrix.needsUpdate = true;
      maze.computeBoundingSphere();
    }
    const small = [...engine.pellets].map((id3) => {
      const [x, y, z] = id3.split(",").map(Number);
      return { x, y, z };
    }), pellets = addLevelMesh(new THREE4.InstancedMesh(dot2, cream, small.length), "pacman-pellets");
    pellets.userData.pickCells = small;
    small.forEach((p, index) => pelletMeshes.set(key(p), { p, mesh: pellets, index, power: false }));
    for (const id3 of engine.powerPills) {
      const [x, y, z] = id3.split(",").map(Number), p = { x, y, z }, mesh = addLevelMesh(new THREE4.Mesh(power, cream), "pacman-power");
      setPosition(mesh, p);
      pelletMeshes.set(id3, { p, mesh, power: true });
    }
    ctx.setLabels([]);
    draw(true);
  }
  function updatePellets(force = false) {
    const count = engine.pellets.size + engine.powerPills.size;
    if (!force && count === lastPelletCount) return;
    for (const [id3, entry] of pelletMeshes) {
      const visible = engine.pellets.has(id3) || engine.powerPills.has(id3);
      if (entry.power) entry.mesh.visible = visible;
      else {
        temp.position.set(...toWorld(entry.p));
        temp.scale.setScalar(visible ? 1 : 0);
        temp.updateMatrix();
        entry.mesh.setMatrixAt(entry.index, temp.matrix);
        entry.mesh.instanceMatrix.needsUpdate = true;
      }
    }
    lastPelletCount = count;
  }
  function draw(force = false) {
    if (disposed || !engine) return;
    followPlayer();
    updateArchitecture();
    updatePellets(force);
    const period = mode === "spatial" ? engine.period : Math.max(0.105, 0.17 - (engine.level - 1) * 9e-3), alpha = engine.status === "playing" ? Math.min(1, engine.tickClock / period) : 1;
    function animated(mesh, current, previous) {
      let p = current;
      if (previous && manhattan(current, previous) <= 1) p = { x: previous.x + (current.x - previous.x) * alpha, y: previous.y + (current.y - previous.y) * alpha, z: previous.z + (current.z - previous.z) * alpha };
      setPosition(mesh, p);
      mesh.userData.pickData = copy(current);
      mesh.traverse((child) => {
        if (child.isMesh) child.userData.pickData = copy(current);
      });
    }
    if (mode === "spatial") {
      setPosition(playerMesh, engine.playerPose());
      playerMesh.userData.pickData = copy(engine.player);
      playerMesh.traverse((child) => {
        if (child.isMesh) child.userData.pickData = copy(engine.player);
      });
    } else animated(playerMesh, engine.player, engine.previousPlayer);
    playerMesh.visible = true;
    headlight.visible = mode === "spatial" && variant === "a";
    rimLight.visible = headlight.visible;
    playerMesh.scale.setScalar(mode === "spatial" ? 0.7 : 1);
    ghosts.forEach((ghost2) => ghost2.root.scale.setScalar(mode === "spatial" ? 0.7 : 1));
    targetMarker.visible = mode === "spatial" && variant === "b" && !!engine.routeTarget;
    if (targetMarker.visible) {
      setPosition(targetMarker, engine.routeTarget);
      targetMarker.rotation.y = clock * 0.9;
      targetMarker.rotation.x = clock * 0.6;
      targetMarker.scale.setScalar(0.9 + 0.1 * Math.sin(clock * 4));
    }
    const routeKey = variant === "b" ? `${key(engine.player)}:${engine.route.map(key).join("|")}` : "";
    routeMesh.visible = mode === "spatial" && variant === "b" && engine.route.length > 0;
    if (routeKey !== lastRoute) {
      lastRoute = routeKey;
      routeGeometry.dispose();
      routeGeometry.setAttribute("position", new THREE4.Float32BufferAttribute(variant === "b" ? [engine.player, ...engine.route].flatMap(toWorld) : [], 3));
      routeGeometry.computeBoundingSphere();
    }
    const d = mode === "spatial" ? VOLUME_DIRECTIONS[engine.player.dir] : [PACMAN_DIRECTIONS[engine.player.dir][0], -PACMAN_DIRECTIONS[engine.player.dir][1], 0];
    playerMesh.quaternion.setFromUnitVectors(localRight, directionVector.set(...d));
    mouth.scale.y = 0.8 + 0.2 * Math.abs(Math.sin(clock * 12));
    const basis = mode === "spatial" ? { right: engine.heading.right, up: engine.heading.up, normal: engine.heading.forward.map((n) => -n || 0) } : VOLUME_PLANES.xy, basisMatrix = new THREE4.Matrix4().makeBasis(new THREE4.Vector3(...basis.right), new THREE4.Vector3(...basis.up), new THREE4.Vector3(...basis.normal));
    ghosts.forEach((mesh, i) => {
      const g = engine.ghosts[i];
      mesh.root.visible = !!g;
      if (!g) return;
      animated(mesh.root, g, g.previous);
      mesh.root.quaternion.setFromRotationMatrix(basisMatrix);
      mesh.root.visible = true;
      mesh.body.forEach((b) => {
        b.visible = !g.returning;
        b.material = engine.frightened > 0 ? engine.frightened < 2 && Math.sin(clock * 12) > 0 ? white : fright : mesh.colorMat;
      });
    });
    for (const entry of pelletMeshes.values()) if (entry.power) entry.mesh.scale.setScalar(0.85 + 0.15 * Math.sin(clock * 5));
    fruit.visible = !!engine.fruit;
    if (engine.fruit) setPosition(fruit, engine.fruit);
    const blocked = mode === "spatial" && !engine.neighbor(engine.player, engine.player.dir);
    const turnAnchor = mode === "spatial" && engine.status === "playing" && engine.tickClock > 1e-8 ? engine.neighbor(engine.player, engine.player.dir) || engine.player : engine.player;
    const routes = mode === "spatial" ? ["left", "up", "down", "right"].map((turn) => engine.neighbor(turnAnchor, directionIndex(pacmanTurnFrame(engine.heading, turn).forward)) !== null) : [];
    const metrics = `${engine.score}:${engine.lives}:${engine.level}:${lastPelletCount}:${engine.status}:${viewMode}:${blocked}:${routes.join()}:${engine.pendingTurns?.length}:${!!engine.routeTarget}:${engine.transition > 0.1}`;
    if (force || metrics !== lastMetrics) {
      ctx.setStats({ "Score": engine.score, "Lives": "\u25CF".repeat(engine.lives), "Level": engine.level, "Pellets": lastPelletCount });
      lastMetrics = metrics;
      el("[data-next]").disabled = engine.status !== "won";
      if (ctx.hud) ctx.hud.innerHTML = '<div class="arcade-scoreboard pacman-scoreboard" style="display:flex;gap:24px;align-items:center;font-family:monospace;color:#fff4d0;text-shadow:0 2px #06142b"><div><small>1UP</small><strong style="display:block;font-size:24px">' + String(engine.score).padStart(6, "0") + '</strong></div><span style="color:#ffdc36;font-size:22px;letter-spacing:3px">' + "\u25D5".repeat(engine.lives) + '</span><div><small>LEVEL</small><strong style="display:block;font-size:20px">' + engine.level + '</strong></div><div><small>\u25CF</small><strong style="display:block;font-size:20px">' + lastPelletCount + "</strong></div></div>" + (mode === "spatial" ? '<div class="pacman-pilot-hud" style="position:absolute;bottom:90px;left:50%;transform:translateX(-50%);text-align:center;color:#ffe783;font-family:monospace;background:rgba(7,19,34,.9);border:1px solid rgba(255,231,131,.2);border-radius:20px;padding:8px 18px;box-shadow:0 4px 18px rgba(0,0,0,.2);white-space:nowrap"><div style="display:flex;justify-content:center;gap:16px;font-size:23px">' + (variant === "a" ? ["\u2190", "\u2191", "\u2193", "\u2192"].map((glyph, i) => '<span style="opacity:' + (routes[i] ? 1 : 0.22) + '">' + glyph + "</span>").join("") : '<span>\u25CE</span><span style="font-size:13px;align-self:center">CLICK A PATH</span>') + '</div><div style="font-size:10px;letter-spacing:1px">' + (variant === "b" ? engine.routeTarget ? "\u25C9 TARGET LOCKED" : "\u25B6 AUTO" : viewMode === "overview" ? "\u25CE PAUSED" : engine.transition > 0.1 ? "\u2197 CROSSING" : blocked ? "\u25A0 TURN" : "\u25B6 AUTO") + "</div></div>" : "");
    }
    const message = engine.status === "gameover" ? "GAME OVER \xB7 R \u21BA" : engine.status === "won" ? "CLEAR! \xB7 \u25B6\u25B6" : engine.status === "ready" ? "READY!" : "";
    if (force || message !== lastMessage) {
      ctx.message(message);
      lastMessage = message;
    }
  }
  function reset() {
    engine = mode === "spatial" ? new VolumePacmanEngine({ dimensions, variant }) : new PacmanEngine({ layers: 1 });
    clock = 0;
    viewMode = variant === "a" ? "chase" : "overview";
    inspection = null;
    lastArchitecture = "";
    el("[data-mode]").disabled = started;
    el("[data-view-controls]").hidden = mode === "classic" || variant === "b";
    el("[data-direction-controls]").hidden = mode === "spatial" && variant === "b";
    buildMaze();
    initialiseCamera();
  }
  function setStarted(value) {
    started = !!value;
    el("[data-mode]").disabled = started;
  }
  function setVariant(value) {
    if (started || !["a", "b", "classic"].includes(value)) return false;
    mode = value === "classic" ? "classic" : "spatial";
    variant = value === "b" ? "b" : "a";
    el("[data-mode]").value = mode === "classic" ? "classic" : variant === "b" ? "explorer" : "spatial";
    reset();
    return true;
  }
  function updateView(dt = 1 / 60) {
    if (!pipes || disposed) return;
    const up = ctx.spatial?.viewUp?.() ?? viewUp;
    if (Array.isArray(up) && up.length === 3 && up.every(Number.isFinite)) {
      viewUp = [...up];
      pipes.update(viewUp, dt);
    }
  }
  function move(input) {
    let handled = false;
    if (mode === "spatial") {
      if (variant === "b") return false;
      viewMode = "chase";
      inspection = null;
      handled = engine.turn(input);
      if (handled) ctx.sound?.("move");
    } else {
      const dir = { arrowup: 0, arrowleft: 1, arrowdown: 2, arrowright: 3 }[input];
      if (dir !== void 0) {
        engine.setDirection(dir);
        handled = true;
      }
    }
    draw(true);
    return handled;
  }
  function onCrossAxis(input) {
    if (mode !== "spatial" || variant === "b") return false;
    return pacmanTurnName(input) ? move(input) : false;
  }
  function next() {
    if (engine.nextLevel()) {
      viewMode = variant === "a" ? "chase" : "overview";
      buildMaze();
      initialiseCamera();
    }
  }
  el("[data-mode]").addEventListener("change", (e) => {
    if (!setVariant(e.target.value === "classic" ? "classic" : e.target.value === "explorer" ? "b" : "a")) el("[data-mode]").value = mode === "classic" ? "classic" : variant === "b" ? "explorer" : "spatial";
  });
  el("[data-reset]").addEventListener("click", reset);
  el("[data-next]").addEventListener("click", next);
  ctx.ui.querySelectorAll("[data-key]").forEach((button) => button.addEventListener("click", () => move(button.dataset.key)));
  el("[data-pilot]").addEventListener("click", () => onView("first-person"));
  el("[data-overview]").addEventListener("click", () => {
    onView("overview");
    ctx.spatial?.overview?.({ target: [0, 0, 0], distance: Math.max(...Object.values(dimensions)) * 2 });
  });
  ctx.setRules?.("<p>A \xB7 Arrow keys / WASD turn the player; auto forward. B \xB7 Click a path cell to travel; WASD rotates the view. Right-drag to look. X isolates a layer; Z restores the view.</p><p>Collect every pellet to clear the level. Energizers turn ghosts edible. Three lives; no lives means game over.</p>");
  reset();
  return {
    reset,
    setStarted,
    setVariant,
    updateView,
    onView,
    onCrossAxis,
    onCameraChange(basis) {
      if (basis?.up) viewUp = [...basis.up];
      updateView();
    },
    update(dt) {
      lastDt = dt;
      clock += dt;
      if (mode === "classic" || variant === "b" || viewMode === "chase") engine.update(dt);
      for (const event of engine.events.splice(0)) {
        if (["power", "ghost", "fruit"].includes(event)) ctx.sound?.("clear");
        if (event === "death") ctx.sound?.("error");
        if (event === "win") ctx.sound?.("win");
      }
      draw();
    },
    onKey(input, event) {
      const k = input.toLowerCase();
      if (pacmanTurnName(k)) {
        event?.preventDefault();
        if (!event?.repeat) move(k);
      } else if (k === "enter") {
        event?.preventDefault();
        next();
      }
    },
    getDimensions() {
      return mode === "spatial" ? { ...dimensions } : { x: 28, y: 31, z: 1 };
    },
    setDimensions(values) {
      if (started && mode === "classic") throw new Error("Choose a 3D play style before starting to edit XYZ.");
      dimensions = validatePacmanDimensions(values);
      mode = "spatial";
      el("[data-mode]").value = variant === "b" ? "explorer" : "spatial";
      reset();
    },
    getSelection() {
      return inspection ?? (mode === "spatial" ? copy(engine.player) : { x: engine.player.x, y: 30 - engine.player.z, z: 0 });
    },
    selectCell(data) {
      if (data && ["x", "y", "z"].every((k) => Number.isInteger(data[k]))) {
        inspection = { x: data.x, y: data.y, z: data.z };
        return true;
      }
      return false;
    },
    cellPosition(data) {
      return data && ["x", "y", "z"].every((k) => Number.isInteger(data[k])) ? { x: data.x, y: data.y, z: data.z } : null;
    },
    onSwipe(input) {
      if (variant !== "b") move(input.toLowerCase());
    },
    onPick(data) {
      if (mode === "spatial" && variant === "b" && data) {
        const accepted = engine.setTarget(data);
        if (accepted) {
          inspection = copy(data);
          ctx.sound?.("move");
          draw(true);
        }
        return accepted;
      }
      return false;
    },
    getState() {
      return { ...engine.snapshot(), mode, variant, started, modeLocked: started, visuals: { actorScale: mode === "spatial" ? 0.7 : 1, corridors: variant === "b" ? pipes?.getState() : { type: "opaque-navy-teal", deckLights: roundDetails?.count ?? 0 } }, ghostMode: engine.mode, fullVolume: mode === "spatial", follow: mode === "spatial" && variant === "a" && viewMode === "chase", viewMode: mode === "spatial" ? viewMode : "classic", cameraMode: mode === "spatial" ? variant === "a" ? "chase" : "overview" : "classic", cameraIntent: mode === "spatial" && variant === "a" ? { type: engine.transition > 0.1 ? "crossing" : "chase", angle: Math.atan(PACMAN_CHASE.height / PACMAN_CHASE.distance) * 180 / Math.PI, distance: PACMAN_CHASE.distance + PACMAN_CHASE.pullback * engine.transition, height: PACMAN_CHASE.height + PACMAN_CHASE.lift * engine.transition, transition: engine.transition } : null, controls: variant === "b" ? "click-target" : "quarter-turn", dimensions: mode === "spatial" ? { ...dimensions } : { x: 28, y: 31, z: 1 } };
    },
    dispose() {
      disposed = true;
      disposeLevel();
      ctx.group.remove(world);
      geometries.forEach((g) => g.dispose());
      materials.forEach((m) => m.dispose());
      if (ctx.hud) ctx.hud.innerHTML = "";
    }
  };
}

// ../Cubiverse/src/games/blokus.js
var PIECES = [
  ["1", [[0, 0]]],
  ["2", [[0, 0], [1, 0]]],
  ["I3", [[0, 0], [1, 0], [2, 0]]],
  ["V3", [[0, 0], [0, 1], [1, 1]]],
  ["I4", [[0, 0], [1, 0], [2, 0], [3, 0]]],
  ["O4", [[0, 0], [1, 0], [0, 1], [1, 1]]],
  ["T4", [[0, 0], [1, 0], [2, 0], [1, 1]]],
  ["L4", [[0, 0], [0, 1], [0, 2], [1, 2]]],
  ["Z4", [[0, 0], [1, 0], [1, 1], [2, 1]]],
  ["F5", [[1, 0], [2, 0], [0, 1], [1, 1], [1, 2]]],
  ["I5", [[0, 0], [1, 0], [2, 0], [3, 0], [4, 0]]],
  ["L5", [[0, 0], [0, 1], [0, 2], [0, 3], [1, 3]]],
  ["P5", [[0, 0], [1, 0], [0, 1], [1, 1], [0, 2]]],
  ["N5", [[0, 0], [0, 1], [1, 1], [1, 2], [1, 3]]],
  ["T5", [[0, 0], [1, 0], [2, 0], [1, 1], [1, 2]]],
  ["U5", [[0, 0], [2, 0], [0, 1], [1, 1], [2, 1]]],
  ["V5", [[0, 0], [0, 1], [0, 2], [1, 2], [2, 2]]],
  ["W5", [[0, 0], [0, 1], [1, 1], [1, 2], [2, 2]]],
  ["X5", [[1, 0], [0, 1], [1, 1], [2, 1], [1, 2]]],
  ["Y5", [[0, 0], [0, 1], [1, 1], [0, 2], [0, 3]]],
  ["Z5", [[0, 0], [1, 0], [1, 1], [1, 2], [2, 2]]]
].map(([id3, cells]) => ({ id: id3, cells }));
var FACE = [[1, 0, 0], [-1, 0, 0], [0, 1, 0], [0, -1, 0], [0, 0, 1], [0, 0, -1]];
var DIAGONAL = [];
for (let x = -1; x <= 1; x++) for (let y = -1; y <= 1; y++) for (let z = -1; z <= 1; z++) {
  if (Math.abs(x) + Math.abs(y) + Math.abs(z) >= 2) DIAGONAL.push([x, y, z]);
}
var CONTACTS = [...FACE, ...DIAGONAL];
var COLORS = ["#1976e8", "#ffc928", "#ed4150", "#2eba70"];
var COLOR_NAMES = ["Blue", "Yellow", "Red", "Green"];
var blokusPiece = (id3) => typeof id3 === "number" ? PIECES[(id3 % 21 + 21) % 21] : id3;
var blokusWorldVectorToLogical = ([x, y, z]) => [x, -z, y].map((n) => n || 0);
var blokusLogicalToWorld = (p, dims) => [p[0] - (dims[0] - 1) / 2, p[2] + 0.45, -(p[1] - (dims[1] - 1) / 2)];
var mapBlokusSpatialBasis = (basis) => ({ ...basis, right: blokusWorldVectorToLogical(basis.right), up: blokusWorldVectorToLogical(basis.up), normal: blokusWorldVectorToLogical(basis.normal) });
var index3 = ([x, y, z], [w, h]) => x + w * (y + h * z);
var add = (a, b) => a.map((v, i) => v + b[i]);
var inside = (p, dims) => Array.isArray(p) && p.length === 3 && p.every((v, i) => Number.isInteger(v) && v >= 0 && v < dims[i]);
var equal = (a, b) => a.every((v, i) => v === b[i]);
function normalize(cells) {
  const mins = [0, 1, 2].map((i) => Math.min(...cells.map((c) => c[i])));
  return cells.map((c) => c.map((v, i) => v - mins[i])).sort((a, b) => a[2] - b[2] || a[1] - b[1] || a[0] - b[0]);
}
function rotateBlokusCells(cells, axis = "y", turns = 1) {
  let result = cells.map((c) => [...c]);
  for (let i = 0; i < (turns % 4 + 4) % 4; i++) result = result.map(([x, y, z]) => axis === "x" ? [x, -z, y] : axis === "y" ? [z, y, -x] : [-y, x, z]);
  return normalize(result);
}
var rawRotate = (p, axis) => axis === "x" ? [p[0], -p[2], p[1]] : axis === "y" ? [p[2], p[1], -p[0]] : [-p[1], p[0], p[2]];
var CUBE_ROTATIONS = (() => {
  const list = [[[1, 0, 0], [0, 1, 0], [0, 0, 1]]], seen = /* @__PURE__ */ new Set([JSON.stringify(list[0])]);
  for (let i = 0; i < list.length; i++) for (const axis of ["x", "y", "z"]) {
    const rotation = list[i].map((p) => rawRotate(p, axis)), key2 = JSON.stringify(rotation);
    if (!seen.has(key2)) {
      seen.add(key2);
      list.push(rotation);
    }
  }
  return list;
})();
function orientPiece3(piece, orientation = 0) {
  const matrix = CUBE_ROTATIONS[(orientation % 24 + 24) % 24];
  return normalize(blokusPiece(piece).cells.map(([u, v]) => matrix[0].map((component, axis) => component * u + matrix[1][axis] * v)));
}
function orientPiece(piece, plane = "xy", turns = 0, flipped = false) {
  let cells = blokusPiece(piece).cells.map(([u, v]) => [flipped ? -u : u, v]);
  for (let n = 0; n < (turns % 4 + 4) % 4; n++) cells = cells.map(([u, v]) => [-v, u]);
  return normalize(cells.map(([u, v]) => plane === "xy" ? [u, v, 0] : plane === "yz" ? [0, u, v] : [u, 0, v]));
}
var orientationCache = /* @__PURE__ */ new Map();
function orientations(piece, spatial = false) {
  const key2 = `${piece % 21}/${spatial}`;
  if (orientationCache.has(key2)) return orientationCache.get(key2);
  const seen = /* @__PURE__ */ new Set(), list = [];
  if (spatial) {
    for (let orientation = 0; orientation < 24; orientation++) {
      const cells = orientPiece3(piece, orientation), serial = JSON.stringify(cells);
      if (!seen.has(serial)) {
        seen.add(serial);
        list.push({ cells, orientation, plane: cells.every((c) => c[1] === 0) ? "xz" : cells.every((c) => c[2] === 0) ? "xy" : "yz" });
      }
    }
    orientationCache.set(key2, list);
    return list;
  }
  for (const plane of ["xy"]) for (let flip = 0; flip < 2; flip++) for (let turns = 0; turns < 4; turns++) {
    const cells = orientPiece(piece, plane, turns, !!flip), serial = JSON.stringify(cells);
    if (!seen.has(serial)) {
      seen.add(serial);
      list.push({ cells, plane, turns, flipped: !!flip });
    }
  }
  orientationCache.set(key2, list);
  return list;
}
var validateDimensions = (value) => {
  const d = Array.isArray(value) ? [...value] : [value?.x, value?.y, value?.z];
  if (d.length !== 3 || d.some((n) => !Number.isSafeInteger(n) || n < 1) || d.reduce((a, b) => a * b, 1) > 4096) throw new RangeError("XYZ must be positive integers; maximum 4096 cells.");
  return d;
};
function blokusInventory(dimensions, spatial = true) {
  if (!spatial) return PIECES.map((_, i) => i);
  const available = PIECES.map((_, i) => i).filter((piece) => orientations(piece, true).some((o) => o.cells.every((p) => inside(p, dimensions))));
  const players = new Set([[0, 0], [dimensions[0] - 1, 0], [dimensions[0] - 1, dimensions[1] - 1], [0, dimensions[1] - 1]].map((p) => p.join(","))).size;
  const budget = Math.max(1, Math.floor(dimensions.reduce((a, b) => a * b, 1) * 0.72 / players)), setSize = available.reduce((sum, i) => sum + blokusPiece(i).cells.length, 0);
  if (budget >= setSize) {
    const sets = Math.max(1, Math.floor(budget / setSize));
    return Array.from({ length: sets }, (_, copy2) => available.map((i) => i + 21 * copy2)).flat();
  }
  const result = [];
  let used = 0;
  for (const piece of available) {
    const size = PIECES[piece].cells.length;
    if (used + size <= budget) {
      result.push(piece);
      used += size;
    }
  }
  return result;
}
function createBlokusState(spatial = true, dimensions = null) {
  const dims = validateDimensions(dimensions ?? (spatial ? [10, 10, 5] : [20, 20, 1])), inventory = blokusInventory(dims, spatial), players = [], seen = /* @__PURE__ */ new Set();
  for (let player = 0; player < 4; player++) {
    const key2 = startingCorner({ dims }, player).join(",");
    if (!seen.has(key2)) {
      players.push(player);
      seen.add(key2);
    }
  }
  const count = dims.reduce((a, b) => a * b, 1);
  return {
    spatial,
    dims,
    board: new Int8Array(count).fill(-1),
    pieceIds: new Int32Array(count).fill(-1),
    nextPieceId: 0,
    players,
    inventory: [...inventory],
    remaining: Array.from({ length: 4 }, (_, i) => players.includes(i) ? [...inventory] : []),
    placed: [0, 0, 0, 0],
    last: [null, null, null, null],
    player: 0,
    passes: 0,
    over: false,
    turn: 0
  };
}
var nextPlayer = (state) => state.players[(state.players.indexOf(state.player) + 1) % state.players.length];
function moveBlokusCursor(cursor, delta, dims) {
  return cursor.map((v, i) => Math.max(0, Math.min(dims[i] - 1, v + delta[i])));
}
function startingCorner(state, player) {
  const [w, h, d] = state.dims;
  return [[0, 0, 0], [w - 1, 0, 0], [w - 1, h - 1, 0], [0, h - 1, 0]][player];
}
function contactPieceKey(state, index, legacyIds) {
  const owner = state.board[index], id3 = state.pieceIds?.[index];
  if (Number.isInteger(id3) && id3 >= 0) return `${owner}:${id3}`;
  if (legacyIds.has(index)) return legacyIds.get(index);
  const key2 = `${owner}:legacy:${index}`, pending = [index], [w, h] = state.dims;
  legacyIds.set(index, key2);
  while (pending.length) {
    const current = pending.pop(), position = [current % w, Math.floor(current / w) % h, Math.floor(current / (w * h))];
    for (const delta of FACE) {
      const neighbour = add(position, delta);
      if (!inside(neighbour, state.dims)) continue;
      const next = index3(neighbour, state.dims), knownId = state.pieceIds?.[next];
      if (state.board[next] !== owner || legacyIds.has(next) || Number.isInteger(knownId) && knownId >= 0) continue;
      legacyIds.set(next, key2);
      pending.push(next);
    }
  }
  return key2;
}
function placementError(state, player, cells, anchor) {
  if (!cells?.length || !Array.isArray(anchor) || !state.players.includes(player)) return "Select a piece.";
  const positions = cells.map((c) => add(c, anchor)), newCells = new Set(positions.map((p) => p.join(",")));
  if (newCells.size !== positions.length || positions.some((p) => !inside(p, state.dims))) return "Outside the board.";
  if (positions.some((p) => state.board[index3(p, state.dims)] !== -1)) return "That cell is occupied.";
  if (state.spatial && positions.some(([x, y, z]) => z > 0 && !newCells.has([x, y, z - 1].join(",")) && state.board[index3([x, y, z - 1], state.dims)] < 0)) return "Every cell needs support below.";
  let contact = false;
  const opponentContacts = /* @__PURE__ */ new Map(), legacyIds = /* @__PURE__ */ new Map();
  for (const p of positions) {
    if (FACE.some((delta) => {
      const n = add(p, delta);
      return inside(n, state.dims) && state.board[index3(n, state.dims)] === player;
    })) return "Your pieces may touch at corners or diagonal edges, never face to face.";
    if (DIAGONAL.some((delta) => {
      const n = add(p, delta);
      return inside(n, state.dims) && state.board[index3(n, state.dims)] === player;
    })) contact = true;
    if (state.spatial) for (const delta of CONTACTS) {
      const n = add(p, delta);
      if (!inside(n, state.dims)) continue;
      const index = index3(n, state.dims), owner = state.board[index];
      if (owner < 0 || owner === player) continue;
      const key2 = contactPieceKey(state, index, legacyIds), distance = delta.reduce((sum, value) => sum + Math.abs(value), 0);
      opponentContacts.set(key2, Math.min(opponentContacts.get(key2) ?? 3, distance));
    }
  }
  if ([...opponentContacts.values()].some((distance) => distance === 3)) return "Meet other colors along an edge or face, not only at a corner.";
  if (state.placed[player] === 0) return positions.some((p) => equal(p, startingCorner(state, player))) ? "" : "Cover your ground corner with the first piece.";
  return contact ? "" : "Connect to a corner or diagonal edge of your own color.";
}
function canPlace(state, player, cells, anchor) {
  return !placementError(state, player, cells, anchor);
}
function findBlokusMove(state, player = state.player, onlyPiece = null) {
  if (state.over || !state.players.includes(player)) return null;
  const targets = /* @__PURE__ */ new Map();
  if (state.placed[player] === 0) {
    const c = startingCorner(state, player);
    targets.set(c.join(","), c);
  } else {
    const [w, h, d] = state.dims;
    for (let z = 0; z < d; z++) for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) {
      if (state.board[index3([x, y, z], state.dims)] !== player) continue;
      for (const delta of DIAGONAL) {
        const p = add([x, y, z], delta);
        if (inside(p, state.dims) && state.board[index3(p, state.dims)] === -1) targets.set(p.join(","), p);
      }
    }
  }
  const pieces = state.remaining[player].filter((i) => onlyPiece === null || i === onlyPiece).sort((a, b) => blokusPiece(b).cells.length - blokusPiece(a).cells.length);
  for (const piece of pieces) for (const orientation of orientations(piece, state.spatial)) {
    const checked = /* @__PURE__ */ new Set();
    for (const target of targets.values()) for (const cell of orientation.cells) {
      const anchor = target.map((v, i) => v - cell[i]), key2 = anchor.join(",");
      if (checked.has(key2)) continue;
      checked.add(key2);
      if (canPlace(state, player, orientation.cells, anchor)) return { piece, anchor, ...orientation };
    }
  }
  return null;
}
function blokusScores(state) {
  return state.remaining.map((pieces, p) => !state.players.includes(p) ? 0 : pieces.length ? -pieces.reduce((sum, i) => sum + blokusPiece(i).cells.length, 0) : 15 + (state.last[p] % 21 === 0 ? 5 : 0));
}
function placeBlokus(state, piece, cells, anchor) {
  const p = state.player;
  if (state.over || !state.remaining[p].includes(piece) || !canPlace(state, p, cells, anchor)) return false;
  if (!orientations(piece, state.spatial).some((o) => JSON.stringify(o.cells) === JSON.stringify(normalize(cells)))) return false;
  if (state.pieceIds?.length !== state.board.length) state.pieceIds = new Int32Array(state.board.length).fill(-1);
  const pieceId = Math.max(state.nextPieceId ?? 0, 1 + state.pieceIds.reduce((max, id3) => Math.max(max, id3), -1));
  state.nextPieceId = pieceId + 1;
  for (const cell of cells) {
    const index = index3(add(cell, anchor), state.dims);
    state.board[index] = p;
    state.pieceIds[index] = pieceId;
  }
  state.remaining[p] = state.remaining[p].filter((i) => i !== piece);
  state.placed[p]++;
  state.last[p] = piece;
  state.passes = 0;
  state.turn++;
  state.player = nextPlayer(state);
  if (state.remaining.every((pieces) => pieces.length === 0)) state.over = true;
  return true;
}
function passBlokus(state) {
  if (state.over || findBlokusMove(state)) return false;
  state.passes++;
  state.turn++;
  state.player = nextPlayer(state);
  if (state.passes >= state.players.length) state.over = true;
  return true;
}
function createGame4(ctx) {
  let spatial = true, dimensions = [10, 10, 5], state, selected = 11, turns = 0, flipped = false, cursor = [0, 0, 0], activeShape = [], hoverCell = null, botTimer = 0, solo = true, lastFollow = null;
  let modeSelect, piecesEl, passButton, confirmButton, statusEl, spatialRotationRow, classicRotationRow, turnRow;
  const doc = ctx.ui.ownerDocument, shape = () => spatial ? activeShape : orientPiece(selected, "xy", turns, flipped);
  const hud = doc.createElement("div");
  hud.className = "game-hud-score hud-blokus";
  ctx.hud?.append(hud);
  function button(text2, action, className = "small-button") {
    const el = doc.createElement("button");
    el.textContent = text2;
    el.className = className;
    el.onclick = action;
    return el;
  }
  function row(...els) {
    const el = doc.createElement("div");
    el.className = "control-row";
    el.append(...els);
    ctx.ui.append(el);
    return el;
  }
  function select(options, action) {
    const el = doc.createElement("select");
    for (const [value, label] of options) {
      const o = doc.createElement("option");
      o.value = value;
      o.textContent = label;
      el.append(o);
    }
    el.onchange = () => action(el.value);
    return el;
  }
  function world(p) {
    return blokusLogicalToWorld(p, state.dims);
  }
  function follow() {
    if (!spatial) return;
    const target = world(cursor), key2 = target.join(",");
    if (key2 === lastFollow) return;
    lastFollow = key2;
    ctx.spatial?.follow?.({ target, weight: 0.3 });
  }
  modeSelect = select([["3d", "3D"], ["2d", "2D"]], (value) => {
    spatial = value === "3d";
    reset();
  });
  modeSelect.setAttribute("aria-label", "BLOKUS mode");
  const players = select([["solo", "You + 3 bots"], ["local", "Local players"]], (value) => {
    solo = value === "solo";
    botTimer = 0;
    render();
  });
  players.setAttribute("aria-label", "Players");
  row(modeSelect, players);
  row(button("\u2191 Move", () => moveCursor("arrowup")), button("\u2190 Move", () => moveCursor("arrowleft")), button("\u2193 Move", () => moveCursor("arrowdown")), button("Move \u2192", () => moveCursor("arrowright")));
  turnRow = row(...[["left", "A \u21B6"], ["right", "D \u21B7"]].map(([direction, label]) => {
    const b = button(label, () => {
      if (spatial) ctx.spatial?.turn?.(direction);
    });
    b.setAttribute("data-turn", direction);
    return b;
  }));
  spatialRotationRow = row(button("\u21BB X \xB7 Q", () => rotate("x")), button("\u21BB Y \xB7 Z", () => rotate("y")), button("\u21BB Z \xB7 C", () => rotate("z")));
  classicRotationRow = row(button("\u21BB Q", () => rotate("z")), button("\u2194 Z", () => {
    flipped = !flipped;
    render();
  }));
  const lower = button("\u2212 Z", () => changeHeight(-1)), higher = button("\uFF0B Z", () => changeHeight(1));
  lower.setAttribute("data-blokus-height", "down");
  higher.setAttribute("data-blokus-height", "up");
  row(lower, higher);
  row(button("Hint [H]", hint), confirmButton = button("Place [Enter]", placePreview, "primary-button"));
  row(passButton = button("Pass", pass), button("Restart", reset));
  statusEl = doc.createElement("p");
  statusEl.className = "hint";
  statusEl.hidden = true;
  ctx.ui.append(statusEl);
  piecesEl = doc.createElement("div");
  piecesEl.className = "piece-grid";
  piecesEl.style.cssText = "display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:5px";
  ctx.ui.append(piecesEl);
  const hintText = doc.createElement("p");
  hintText.className = "hint";
  hintText.textContent = "Right drag to orbit. A / D turn. Arrows move. Q / Z / C rotate; Shift reverses. PageUp / PageDown change height. Enter places";
  hintText.hidden = true;
  ctx.ui.append(hintText);
  ctx.setRules?.("<p>Start on your ground corner. Your separate pieces must meet at a corner or diagonal edge, never face to face, including vertically. In 3D, meet each touching opponent piece along an edge or face; a corner alone is not enough.</p><p>Every cell needs support: the ground, another color, or the same new rigid piece. A / D turn; Q / Z / C rotate; PageUp / PageDown change height; Enter places.</p><p>Pass only when blocked. Fewest unplaced cells wins. Place every piece for +15; finish with a single cell for +5 more.</p>");
  function selectPiece(i) {
    selected = i;
    turns = 0;
    flipped = false;
    activeShape = orientPiece3(i);
    render();
  }
  function refreshPieces() {
    piecesEl.replaceChildren();
    for (const i of state.remaining[state.player]) {
      const p = blokusPiece(i), b = button("", () => selectPiece(i), "piece-button" + (selected === i ? " selected" : ""));
      b.setAttribute("aria-label", p.id + (i >= 21 ? " #" + (Math.floor(i / 21) + 1) : "") + ", " + p.cells.length + " cells");
      b.style.cssText = "min-height:58px;display:flex;align-items:center;gap:5px;padding:5px;border-color:" + (selected === i ? COLORS[state.player] : "");
      const icon = doc.createElement("span");
      icon.style.cssText = "display:grid;grid-template-columns:repeat(5,6px);grid-template-rows:repeat(5,6px);gap:1px;flex-shrink:0";
      for (const [u, v] of p.cells) {
        const tile = doc.createElement("span");
        tile.style.cssText = "grid-column:" + (u + 1) + ";grid-row:" + (v + 1) + ";background:" + COLORS[state.player] + ";border-radius:1px";
        icon.append(tile);
      }
      const label = doc.createElement("span");
      label.textContent = p.id + (i >= 21 ? "\xB7" + (Math.floor(i / 21) + 1) : "");
      b.append(icon, label);
      b.disabled = state.over || solo && state.player !== 0;
      piecesEl.append(b);
    }
  }
  function render() {
    if (!state) return;
    const voxels2 = [], labels2 = [], dims = state.dims, selectedShape = shape(), preview = selectedShape.map((c) => add(c, cursor)), valid = canPlace(state, state.player, selectedShape, cursor);
    voxels2.push({ x: 0, y: -0.13, z: 0, sx: dims[0] + 0.3, sy: 0.18, sz: dims[1] + 0.3, color: "#a6b6a3", boardBase: true });
    for (let y = 0; y < dims[1]; y++) for (let x = 0; x < dims[0]; x++) {
      const p = [x, y, 0], [wx, , wz] = world(p), corner = state.players.find((i) => equal(p, startingCorner(state, i)));
      voxels2.push({ x: wx, y: -0.02, z: wz, sx: 0.96, sy: 0.05, sz: 0.96, color: corner !== void 0 ? COLORS[corner] : (x + y) % 2 ? "#e0e7d9" : "#edf0e5", data: { cell: p }, ground: true });
      let highest = -1;
      for (let z = 0; z < dims[2]; z++) {
        const cell = [x, y, z], owner = state.board[index3(cell, dims)];
        if (owner < 0) continue;
        highest = z;
        const [px, py, pz] = world(cell);
        voxels2.push({ x: px, y: py, z: pz, sx: 0.91, sy: 0.91, sz: 0.91, color: COLORS[owner], data: { cell }, piece: true });
      }
      if (spatial && highest >= 0 && highest + 1 < dims[2]) {
        const cell = [x, y, highest + 1], [px, py, pz] = world(cell);
        voxels2.push({ x: px, y: py - 0.44, z: pz, sx: 0.92, sy: 0.035, sz: 0.92, color: "#b4c4ad", opacity: 0.28, data: { cell, surface: true }, placementSurface: true });
      }
    }
    if (spatial && dims[2] > 1) {
      const px = -dims[0] / 2 - 0.3, pz = -dims[1] / 2 - 0.3;
      voxels2.push({ x: px, y: dims[2] / 2, z: pz, sx: 0.018, sy: dims[2], sz: 0.018, color: "#90a68f", opacity: 0.32, heightGuide: true });
      const levels = [.../* @__PURE__ */ new Set([0, Math.floor(dims[2] / 2), dims[2] - 1])];
      for (const level of levels) {
        voxels2.push({ x: px + 0.09, y: level + 0.04, z: pz, sx: 0.2, sy: 0.014, sz: 0.014, color: "#90a68f", opacity: 0.4, heightGuide: true });
        labels2.push({ x: px - 0.2, y: level + 0.1, z: pz, text: String(level + 1), size: 0.18, color: "#7c927d" });
      }
    }
    if (!state.over && !(solo && state.player !== 0)) for (const p of preview) {
      const [x, y, z] = world(p);
      voxels2.push({ x, y, z, color: valid ? COLORS[state.player] : "#e77d72", sx: 0.93, sy: 0.93, sz: 0.93, opacity: valid ? 0.56 : 0.25, data: inside(p, dims) ? { cell: p, preview: true } : void 0, preview: true });
    }
    if (hoverCell && !equal(hoverCell, cursor)) {
      const [x, y, z] = world(hoverCell);
      voxels2.push({ x, y: y - 0.43, z, sx: 0.96, sy: 0.025, sz: 0.96, color: "#f6d688", opacity: 0.8, data: { cell: hoverCell }, hover: true });
    }
    for (const i of state.players) {
      const [x, , z] = world(startingCorner(state, i));
      labels2.push({ x, y: 0.09, z, text: "\u25CF", size: 0.26, color: COLORS[i], data: { cell: startingCorner(state, i) } });
    }
    ctx.setVoxels(voxels2);
    ctx.setLabels(labels2);
    refreshPieces();
    const scores = blokusScores(state), placedSquares = [0, 1, 2, 3].map((player) => state.board.reduce((total, owner) => total + Number(owner === player), 0));
    hud.innerHTML = `<span style="display:inline-flex;align-items:center;gap:7px" title="${COLOR_NAMES[state.player]} \xB7 Pieces left" aria-label="${COLOR_NAMES[state.player]} turn, ${state.remaining[state.player].length} pieces left"><i style="width:9px;height:9px;border-radius:50%;background:${COLORS[state.player]};box-shadow:0 0 0 3px ${COLORS[state.player]}22"></i><svg aria-hidden="true" width="15" height="15" viewBox="0 0 15 15" fill="${COLORS[state.player]}"><rect x="1" y="1" width="6" height="6" rx="1"/><rect x="1" y="8" width="6" height="6" rx="1"/><rect x="8" y="8" width="6" height="6" rx="1"/></svg><b>${state.remaining[state.player].length}</b></span><span style="display:inline-flex;gap:11px;margin-left:16px;padding-left:15px;border-left:1px solid #53685926">${placedSquares.map((count, i) => `<span style="display:inline-flex;align-items:center;gap:4px" title="${COLOR_NAMES[i]} placed ${count} cells" aria-label="${COLOR_NAMES[i]} placed ${count} cells"><i style="width:8px;height:8px;border-radius:2px;background:${COLORS[i]}"></i><b>${count}</b></span>`).join("")}</span>`;
    hud.style.color = "#344b40";
    ctx.setStats({ "Turn": state.turn + 1, "Player": COLOR_NAMES[state.player] + (solo && state.player !== 0 ? " (bot)" : ""), "Pieces": state.remaining[state.player].length, "Ground X/Y \xB7 Height Z": cursor.map((v) => v + 1).join(" / "), "Blue / Yellow / Red / Green": scores.join(" / ") });
    confirmButton.disabled = !valid || state.over || solo && state.player !== 0;
    passButton.disabled = state.over || solo && state.player !== 0;
    statusEl.textContent = state.over ? "Game over. Restart to play again." : "Piece " + blokusPiece(selected).id + " \xB7 " + (spatial ? "3D orientation" : turns * 90 + "\xB0" + (flipped ? " flipped" : "")) + " \xB7 " + (valid ? "Ready to place" : "Invalid position");
    if (state.over) {
      const max = Math.max(...state.players.map((p) => scores[p])), winners = scores.flatMap((s, i) => s === max && state.players.includes(i) ? [COLOR_NAMES[i]] : []);
      ctx.message(winners.join(" & ") + " " + (winners.length > 1 ? "tie" : "wins") + " \xB7 " + max + " points");
    }
  }
  function moveCursor(key2) {
    if (state.over || solo && state.player !== 0) return;
    const delta = (spatial ? ctx.spatial?.vectorForKey(key2) : null) ?? { arrowleft: [-1, 0, 0], arrowright: [1, 0, 0], arrowup: [0, 0, -1], arrowdown: [0, 0, 1] }[key2];
    if (!delta) return;
    const logical = blokusWorldVectorToLogical(delta), next2 = moveBlokusCursor(cursor, logical, state.dims);
    if (equal(next2, cursor)) return;
    cursor = next2;
    hoverCell = null;
    render();
    follow();
  }
  function changeHeight(amount) {
    if (!spatial || state.over || solo && state.player !== 0) return;
    cursor[2] = Math.max(0, Math.min(state.dims[2] - 1, cursor[2] + amount));
    hoverCell = null;
    render();
  }
  function rotate(axis, inverse = false) {
    if (state.over || solo && state.player !== 0) return;
    if (spatial) activeShape = rotateBlokusCells(activeShape, axis, inverse ? -1 : 1);
    else turns = (turns + (inverse ? 3 : 1)) % 4;
    render();
  }
  function reset() {
    state = createBlokusState(spatial, spatial ? dimensions : null);
    selected = state.remaining[0].includes(11) ? 11 : state.remaining[0].at(-1) ?? 0;
    turns = 0;
    flipped = false;
    cursor = [0, 0, 0];
    activeShape = orientPiece3(selected);
    hoverCell = null;
    botTimer = 0;
    lastFollow = null;
    modeSelect.value = spatial ? "3d" : "2d";
    spatialRotationRow.hidden = !spatial;
    classicRotationRow.hidden = spatial;
    turnRow.hidden = !spatial;
    ctx.message("Blue starts \xB7 Cover the blue corner");
    render();
    if (spatial && ctx.spatial?.volume) ctx.spatial.volume({ target: [0, Math.min(2, state.dims[2] / 3), 0], distance: Math.max(state.dims[0], state.dims[1], state.dims[2]) * 2.3, size: [state.dims[0], state.dims[2] + 0.3, state.dims[1]] });
    else ctx.frame({ target: [0, 0, 0], distance: spatial ? 29 : 33, position: spatial ? void 0 : [0, 33, 1e-3] });
  }
  function next() {
    turns = 0;
    flipped = false;
    selected = state.remaining[state.player].at(-1) ?? 0;
    activeShape = orientPiece3(selected);
    botTimer = 0;
    cursor = startingCorner(state, state.player);
    hoverCell = null;
    render();
    if (!solo || state.player === 0) follow();
  }
  function hint() {
    if (state.over || solo && state.player !== 0) return;
    const move = findBlokusMove(state, state.player, selected) ?? findBlokusMove(state);
    if (!move) {
      ctx.message("No legal move \xB7 Pass");
      render();
      return;
    }
    selected = move.piece;
    cursor = [...move.anchor];
    activeShape = move.cells.map((c) => [...c]);
    turns = move.turns ?? 0;
    flipped = move.flipped ?? false;
    hoverCell = null;
    render();
    follow();
    ctx.message("\u2713 " + blokusPiece(selected).id + " \xB7 Enter to place");
  }
  function placePreview() {
    if (state.over || solo && state.player !== 0) return;
    if (!placeBlokus(state, selected, shape(), cursor)) {
      ctx.message(placementError(state, state.player, shape(), cursor));
      ctx.sound?.("error");
      return;
    }
    ctx.sound?.("move");
    ctx.message(COLOR_NAMES[state.player] + " to play");
    next();
  }
  function pass() {
    if (state.over || solo && state.player !== 0) return;
    if (!passBlokus(state)) {
      ctx.message("A legal move is available.");
      hint();
      return;
    }
    ctx.message("No legal move \xB7 Next player.");
    next();
  }
  reset();
  return {
    reset,
    cameraTurns: ["a", "d"],
    mapSpatialBasis: mapBlokusSpatialBasis,
    getDimensions() {
      const [x, y, z] = state.dims;
      return { x, y, z };
    },
    setDimensions(value) {
      dimensions = validateDimensions(value);
      spatial = true;
      reset();
    },
    getSelection() {
      const [x, y, z] = cursor;
      return { x, y, z };
    },
    cellPosition(data) {
      return Array.isArray(data?.cell) && inside(data.cell, state.dims) ? [...data.cell] : null;
    },
    selectCell(data) {
      if (Array.isArray(data?.cell) && inside(data.cell, state.dims)) {
        cursor = [...data.cell];
        hoverCell = null;
        render();
      }
    },
    render,
    update(dt) {
      if (!solo || state.over || state.player === 0) return;
      botTimer += dt;
      if (botTimer < 0.65) return;
      botTimer = 0;
      const move = findBlokusMove(state);
      if (move) placeBlokus(state, move.piece, move.cells, move.anchor);
      else passBlokus(state);
      ctx.message(state.player === 0 ? "Blue to play \xB7 Enter to place" : COLOR_NAMES[state.player] + " bot is playing\u2026");
      next();
    },
    onPick(data) {
      if (!inside(data?.cell, state.dims) || state.over || solo && state.player !== 0) return;
      cursor = [...data.cell];
      hoverCell = null;
      if (spatial) {
        render();
        follow();
      } else placePreview();
    },
    onHover(data) {
      if (state.over || solo && state.player !== 0) return;
      const next2 = inside(data?.cell, state.dims) ? data.cell : null;
      if (JSON.stringify(next2) === JSON.stringify(hoverCell)) return;
      hoverCell = next2 ? [...next2] : null;
      render();
    },
    onKey(key2, event) {
      const normalized = key2.toLowerCase();
      if (["arrowleft", "arrowright", "arrowup", "arrowdown"].includes(normalized)) {
        event?.preventDefault();
        moveCursor(normalized);
      } else if (normalized === "q") rotate(spatial ? "x" : "z", event?.shiftKey);
      else if (normalized === "z") {
        if (spatial) rotate("y", event?.shiftKey);
        else {
          flipped = !flipped;
          render();
        }
      } else if (normalized === "c" && spatial) rotate("z", event?.shiftKey);
      else if (normalized === "pageup") {
        event?.preventDefault();
        changeHeight(1);
      } else if (normalized === "pagedown") {
        event?.preventDefault();
        changeHeight(-1);
      } else if (normalized === "h") hint();
      else if (normalized === "enter") {
        event?.preventDefault();
        if (!event?.repeat) placePreview();
      }
    },
    getState() {
      return { ...state, inventory: [...state.inventory], players: [...state.players], dims: [...state.dims], remaining: state.remaining.map((p) => [...p]), placed: [...state.placed], last: [...state.last], board: Array.from(state.board), pieceIds: Array.from(state.pieceIds), selected, turns, flipped, hover: hoverCell ? [...hoverCell] : null, cursor: [...cursor], shape: shape().map((c) => [...c]), preview: shape().map((c) => add(c, cursor)), placementValid: canPlace(state, state.player, shape(), cursor), solo, volume: spatial, groundAxes: ["x", "y"], heightAxis: "z", worldAxes: ["x", "z", "-y"], inventoryCells: state.inventory.reduce((total, i) => total + blokusPiece(i).cells.length, 0), scores: blokusScores(state) };
    },
    dispose() {
      hud.remove?.();
      ctx.ui.replaceChildren();
    }
  };
}

// ../Cubiverse/src/games/numpuz.js
import { Matrix4 as Matrix42, Quaternion as Quaternion3, Vector3 as Vector33 } from "../../vendor/three.module.js";
function puzzleIndex(x, y, z, dimensions) {
  return x + dimensions.x * (z + dimensions.z * y);
}
function puzzleCoordinates(index, dimensions) {
  return { x: index % dimensions.x, y: Math.floor(index / (dimensions.x * dimensions.z)), z: Math.floor(index / dimensions.x) % dimensions.z };
}
function puzzleNeighbors(index, dimensions) {
  const point2 = puzzleCoordinates(index, dimensions);
  const result = [];
  for (const axis of ["x", "y", "z"]) for (const delta of [-1, 1]) {
    const next = { ...point2, [axis]: point2[axis] + delta };
    if (next[axis] >= 0 && next[axis] < dimensions[axis]) result.push(puzzleIndex(next.x, next.y, next.z, dimensions));
  }
  return result;
}
function puzzleSolved(board) {
  return board.length > 0 && board.every((value, index) => value === (index === board.length - 1 ? 0 : index + 1));
}
function validatePuzzleDimensions(dimensions) {
  return dimensions && ["x", "y", "z"].every((axis) => Number.isInteger(dimensions[axis]) && dimensions[axis] >= 1 && Number.isSafeInteger(dimensions.x * dimensions.y * dimensions.z));
}
function shufflePuzzle(dimensions, steps = 56, rng = Math.random) {
  if (!validatePuzzleDimensions(dimensions)) throw new RangeError("X, Y and Z must be positive integers.");
  if (!Number.isInteger(steps) || steps < 1 || steps > 5e3) throw new RangeError("Numpuz shuffle steps must be 1\u20135000.");
  const count = dimensions.x * dimensions.y * dimensions.z;
  const board = Array.from({ length: count }, (_, index) => index === count - 1 ? 0 : index + 1);
  let blank = count - 1, previous = -1;
  const route = [];
  for (let step = 0; step < steps; step++) {
    let choices = puzzleNeighbors(blank, dimensions).filter((index) => index !== previous);
    if (!choices.length) choices = puzzleNeighbors(blank, dimensions);
    if (!choices.length) break;
    const next = choices[Math.floor(rng() * choices.length)];
    route.push(blank);
    [board[blank], board[next]] = [board[next], board[blank]];
    previous = blank;
    blank = next;
  }
  if (puzzleSolved(board) && count > 1) {
    const next = puzzleNeighbors(blank, dimensions)[0];
    route.push(blank);
    [board[blank], board[next]] = [board[next], board[blank]];
    blank = next;
  }
  return { board, blank, route };
}
var NumpuzGame = class {
  constructor({ dimensions = { x: 2, y: 2, z: 2 }, steps = 56, rng = Math.random } = {}) {
    this.dimensions = { ...dimensions };
    this.initial = shufflePuzzle(this.dimensions, steps, rng);
    this.restart();
  }
  restart() {
    this.board = [...this.initial.board];
    this.blank = this.initial.blank;
    this.route = [...this.initial.route];
    this.moves = 0;
    this.hints = 0;
    this.elapsed = 0;
    this.started = false;
    this.won = puzzleSolved(this.board);
    this.history = [];
  }
  move(index, hint = false) {
    if (this.won || !Number.isInteger(index) || !puzzleNeighbors(this.blank, this.dimensions).includes(index)) return false;
    const oldBlank = this.blank;
    const reversed = this.route.length > 0 && this.route[this.route.length - 1] === index;
    this.history.push({ blank: oldBlank, target: index, reversed, hints: this.hints });
    if (reversed) this.route.pop();
    else this.route.push(oldBlank);
    [this.board[oldBlank], this.board[index]] = [this.board[index], this.board[oldBlank]];
    this.blank = index;
    this.moves++;
    if (hint) this.hints++;
    this.started = true;
    this.won = puzzleSolved(this.board);
    return true;
  }
  moveAxis(axis, delta) {
    if (!["x", "y", "z"].includes(axis) || Math.abs(delta) !== 1) return false;
    const point2 = puzzleCoordinates(this.blank, this.dimensions);
    point2[axis] += delta;
    if (point2[axis] < 0 || point2[axis] >= this.dimensions[axis]) return false;
    return this.move(puzzleIndex(point2.x, point2.y, point2.z, this.dimensions));
  }
  undo() {
    const previous = this.history.pop();
    if (!previous) return false;
    [this.board[previous.blank], this.board[previous.target]] = [this.board[previous.target], this.board[previous.blank]];
    if (previous.reversed) this.route.push(previous.target);
    else this.route.pop();
    this.blank = previous.blank;
    this.hints = previous.hints;
    this.moves = Math.max(0, this.moves - 1);
    this.won = false;
    return true;
  }
  hint() {
    if (this.won || !this.route.length) return -1;
    const target = this.route[this.route.length - 1];
    return this.move(target, true) ? target : -1;
  }
  tick(dt) {
    if (this.started && !this.won) this.elapsed += dt;
  }
  getState() {
    return { dimensions: { ...this.dimensions }, board: [...this.board], blank: this.blank, moves: this.moves, hints: this.hints, elapsed: this.elapsed, won: this.won, legalMoves: puzzleNeighbors(this.blank, this.dimensions), routeRemaining: this.route.length };
  }
};
function numpuzGoalPlanes(dimensions, pair = 0) {
  const lower = Math.min(Math.max(0, pair * 2), Math.max(0, dimensions.y - 2)), levels = dimensions.y === 1 ? [0] : [lower + 1, lower];
  return levels.map((y, n) => ({ y, name: n === 0 && dimensions.y > 1 ? "UP" : "DOWN", values: Array.from({ length: dimensions.x * dimensions.z }, (_, i) => {
    const index = puzzleIndex(i % dimensions.x, y, Math.floor(i / dimensions.x), dimensions);
    return index === dimensions.x * dimensions.y * dimensions.z - 1 ? 0 : index + 1;
  }) }));
}
function numpuzPlaqueQuaternion(basis) {
  const matrix = new Matrix42().makeBasis(new Vector33(...basis.right), new Vector33(...basis.up), new Vector33(...basis.normal));
  return new Quaternion3().setFromRotationMatrix(matrix).normalize().toArray();
}
function createGame5(ctx) {
  let game, lastSecond = -1, showGoal = false, hovered = null, selectedIndex = null, customDimensions = { x: 2, y: 2, z: 2 }, activeSlice = null, goalPair = 0, rails = [], slide = null, gimbal = null;
  const doc = ctx.ui.ownerDocument ?? globalThis.document;
  const numeralGeometry = ctx.THREE && ctx.group ? new ctx.THREE.PlaneGeometry(1, 1) : null;
  const numerals = numeralGeometry ? new CubeLabels(ctx.group, numeralGeometry) : null;
  const plaqueQuaternion = new Quaternion3(), targetQuaternion = new Quaternion3();
  const reducedMotion = typeof matchMedia === "function" && matchMedia("(prefers-reduced-motion: reduce)").matches;
  ctx.ui.innerHTML = '<div class="control-group"><label><select aria-label="Numpuz mode" data-mode><option value="volume">3D</option><option value="classic">15 Puzzle</option></select></label><label>\u21AF <select aria-label="Shuffle steps" data-level><option value="12">12</option><option value="56" selected>56</option><option value="120">120</option></select></label><p class="hint" data-position hidden></p><p class="hint" data-instructions hidden></p><div class="control-row" data-moves></div><div class="control-row" data-turns></div><div class="control-row"><button class="small-button" data-goal title="Preview solution">\u25A6</button><button class="small-button" data-undo title="Undo U">\u21B6 U</button><button class="small-button" data-hint title="Hint H">\u2600 H</button><button class="small-button" data-restart title="Restart">\u21BB</button><button class="primary-button" data-new title="Shuffle again">\u21AF</button></div><details><summary>Adjacent tiles</summary><div class="piece-grid" data-neighbors></div></details></div>';
  const hud = ctx.hud ? doc.createElement("div") : null;
  if (hud) {
    hud.className = "game-hud numpuz-hud v13-numpuz-hud";
    ctx.hud.append(hud);
  }
  const q = (selector) => ctx.ui.querySelector(selector), mode = q("[data-mode]"), isVolume = () => mode.value !== "classic", pitch = () => isVolume() ? 1.32 : 1.12;
  const button = (text2, action) => {
    const el = doc.createElement("button");
    el.type = "button";
    el.className = "small-button";
    el.textContent = text2;
    el.onclick = action;
    return el;
  };
  const validIndex = (index) => Number.isInteger(index) && index >= 0 && index < game.board.length;
  function world(point2) {
    return ["x", "y", "z"].map((axis) => (point2[axis] - (game.dimensions[axis] - 1) / 2) * pitch());
  }
  function follow() {
    if (isVolume()) ctx.spatial?.follow?.({ target: world(puzzleCoordinates(game.blank, game.dimensions)), weight: 0.2 });
  }
  function renderHud() {
    if (!hud) return;
    const d = game.dimensions;
    hud.innerHTML = `<div class="numpuz-v13-counters"><span aria-label="Moves">\u2194 <b>${game.moves}</b></span><span aria-label="Time">\u25F7 <b>${Math.floor(game.elapsed / 60)}:${String(Math.floor(game.elapsed) % 60).padStart(2, "0")}</b></span></div><aside class="numpuz-v13-goals" aria-label="Solution">${numpuzGoalPlanes(d, goalPair).map((plane) => `<figure><figcaption>${plane.name}${d.y > 2 ? `<small>${plane.y + 1}</small>` : ""}</figcaption><div class="numpuz-v13-goal-tray" style="--columns:${d.x}">${plane.values.map((value, i) => {
      const p = { x: i % d.x, y: plane.y, z: Math.floor(i / d.x) }, lit = activeSlice?.mode === "layer" && p[activeSlice.axis] === activeSlice.index;
      return `<span class="numpuz-v13-goal-tile${!value ? " empty" : ""}${lit ? " active" : ""}">${value || ""}</span>`;
    }).join("")}</div></figure>`).join("")}${d.y > 2 ? `<nav><button data-goal-previous aria-label="Previous goal layers">\u2039</button><span>${goalPair + 1}/${Math.ceil(d.y / 2)}</span><button data-goal-next aria-label="Next goal layers">\u203A</button></nav>` : ""}</aside>`;
    const previous = hud.querySelector?.("[data-goal-previous]"), next = hud.querySelector?.("[data-goal-next]");
    if (previous) previous.onclick = () => {
      goalPair = (goalPair + Math.ceil(d.y / 2) - 1) % Math.ceil(d.y / 2);
      renderHud();
    };
    if (next) next.onclick = () => {
      goalPair = (goalPair + 1) % Math.ceil(d.y / 2);
      renderHud();
    };
  }
  function status() {
    renderHud();
    const dim = game.dimensions;
    ctx.setStats({ "Board": dim.x + " \xD7 " + dim.y + " \xD7 " + dim.z, "Moves": game.moves, "Time": Math.floor(game.elapsed / 60) + ":" + String(Math.floor(game.elapsed) % 60).padStart(2, "0"), "Home": game.board.filter((v, i) => v && v === i + 1).length + "/" + (game.board.length - 1), "Hints": game.hints });
  }
  function buildRails() {
    rails = [];
    const dims = ["x", "y", "z"].map((a) => game.dimensions[a]), space = pitch();
    if (!isVolume()) {
      rails.push({ x: 0, y: -0.15, z: 0, sx: dims[0] * space + 0.12, sy: 0.14, sz: dims[2] * space + 0.12, color: "#9c754c", boardBase: true });
      for (let index = 0; index < game.board.length; index++) {
        const [x, y, z] = world(puzzleCoordinates(index, game.dimensions));
        rails.push({ x, y: y - 0.06, z, sx: space - 0.07, sy: 0.025, sz: space - 0.07, color: "#bb9667", data: { index, bed: true } });
      }
      return;
    }
    for (let axis = 0; axis < 3; axis++) {
      const [a, b] = [0, 1, 2].filter((i) => i !== axis);
      for (let step = 0; step < dims[axis]; step++) for (let u = 0; u <= dims[a]; u++) for (let v = 0; v <= dims[b]; v++) {
        const position = [0, 0, 0], size = [0.034, 0.034, 0.034], cell = [0, 0, 0], outer = (u === 0 || u === dims[a]) && (v === 0 || v === dims[b]);
        position[axis] = (step - (dims[axis] - 1) / 2) * space;
        position[a] = (u - dims[a] / 2) * space;
        position[b] = (v - dims[b] / 2) * space;
        size[axis] = space + 0.02;
        if (outer) for (const i of [a, b]) size[i] = 0.065;
        cell[axis] = step;
        cell[a] = Math.min(u, dims[a] - 1);
        cell[b] = Math.min(v, dims[b] - 1);
        rails.push({ x: position[0], y: position[1], z: position[2], sx: size[0], sy: size[1], sz: size[2], color: outer ? "#b98b54" : "#c5a579", opacity: outer ? 1 : 0.72, data: { index: puzzleIndex(...cell, game.dimensions), rail: true }, railAxis: axis });
      }
    }
    if (game.board.length <= 512) for (let x = 0; x <= dims[0]; x++) for (let y = 0; y <= dims[1]; y++) for (let z = 0; z <= dims[2]; z++) {
      const point2 = [x, y, z].map((v, a) => (v - dims[a] / 2) * space);
      rails.push({ x: point2[0], y: point2[1], z: point2[2], sx: 0.075, sy: 0.075, sz: 0.075, color: "#d9bc7d", joint: true });
    }
  }
  function drawBoard() {
    const dim = game.dimensions, legal = puzzleNeighbors(game.blank, dim), voxels2 = [...rails], labels2 = [], quaternion = plaqueQuaternion.toArray();
    const offset = (local) => new Vector33(...local).applyQuaternion(plaqueQuaternion).toArray();
    const body = (position, local, size, color, data, opacity = 1) => {
      const shift = offset(local);
      voxels2.push({ x: position[0] + shift[0], y: position[1] + shift[1], z: position[2] + shift[2], sx: size[0], sy: size[1], sz: size[2], color, opacity, quaternion, data });
    };
    for (let index = 0; index < game.board.length; index++) {
      const value = showGoal ? index === game.board.length - 1 ? 0 : index + 1 : game.board[index];
      if (!value) continue;
      let position = world(puzzleCoordinates(index, dim));
      if (slide && slide.value === value && !showGoal) {
        const t = Math.min(1, slide.elapsed / slide.duration), e = t * t * (3 - 2 * t);
        position = slide.from.map((v, a) => v + (slide.to[a] - v) * e);
      }
      const isLegal = !showGoal && legal.includes(index), inPlace = value === index + 1, data = { index, tile: true, value };
      const color = index === hovered ? "#ffe5b2" : isLegal ? "#f6d6a0" : inPlace ? "#f1dfba" : "#e3c391";
      body(position, [0, 0, 0], [0.84, 0.84, 0.12], "#ad7c48", { ...data, part: "body" });
      body(position, [0, 0, 0.068], [0.8, 0.8, 0.025], color, { ...data, part: "face" });
      for (const sign of [-1, 1]) {
        body(position, [sign * 0.37, 0, 0.085], [0.012, 0.72, 6e-3], "#c89e67", { ...data, part: "inlay" });
        body(position, [0, sign * 0.37, 0.085], [0.72, 0.012, 6e-3], "#c89e67", { ...data, part: "inlay" });
      }
      if (isLegal) body(position, [0, -0.285, 0.089], [0.13, 0.024, 6e-3], "#7c9a78", { ...data, part: "legal" });
      const normal = offset([0, 0, 0.091]);
      labels2.push({ x: position[0] + normal[0], y: position[1] + normal[1], z: position[2] + normal[2], text: String(value), color: "#765236", cube: !!numerals, sx: 0.65, sy: 0.65, sz: 1, size: 0.52, fontFamily: "Georgia, serif", quaternion, data: { index } });
    }
    if (!showGoal) {
      const blank = world(puzzleCoordinates(game.blank, dim));
      for (const sign of [-1, 1]) {
        body(blank, [sign * 0.36, 0, 0], [0.025, 0.74, 0.025], "#8da892", { index: game.blank, empty: true }, 0.65);
        body(blank, [0, sign * 0.36, 0], [0.74, 0.025, 0.025], "#8da892", { index: game.blank, empty: true }, 0.65);
      }
      if (slide) {
        const middle = slide.from.map((v, a) => (v + slide.to[a]) / 2), axis = slide.from.findIndex((v, a) => v !== slide.to[a]), size = [0.025, 0.025, 0.025];
        size[axis] = pitch();
        voxels2.push({ x: middle[0], y: middle[1], z: middle[2], sx: size[0], sy: size[1], sz: size[2], color: "#dcab57", opacity: 0.22, slideGuide: true });
      }
    }
    ctx.setVoxels(voxels2);
    if (numerals) {
      numerals.set(labels2);
      ctx.setLabels([]);
    } else ctx.setLabels(labels2);
  }
  function render() {
    drawBoard();
    const dim = game.dimensions, blankPoint = puzzleCoordinates(game.blank, dim), legal = puzzleNeighbors(game.blank, dim);
    q("[data-position]").textContent = "\u25A1 " + [blankPoint.x + 1, blankPoint.y + 1, blankPoint.z + 1].join(" / ");
    q("[data-instructions]").textContent = "Tile \u2192 Empty";
    q("[data-goal]").textContent = showGoal ? "\u25A6 \u25CF" : "\u25A6";
    q("[data-goal]").setAttribute("aria-pressed", String(showGoal));
    const names = { arrowup: "\u2191 Slide", arrowleft: "\u2190 Slide", arrowdown: "\u2193 Slide", arrowright: "Slide \u2192" };
    q("[data-moves]").replaceChildren(...Object.keys(names).map((key2) => {
      const el = button(names[key2], () => direction(key2));
      el.setAttribute("data-direction", key2);
      el.disabled = game.won || showGoal || !!slide;
      return el;
    }));
    q("[data-turns]").hidden = !isVolume();
    q("[data-turns]").replaceChildren(...[["up", "W \u21A5"], ["down", "S \u21A7"], ["left", "A \u21B6"], ["right", "D \u21B7"]].map(([turn, label]) => {
      const el = button(label, () => {
        if (isVolume()) ctx.spatial?.turn?.(turn);
      });
      el.setAttribute("data-turn", turn);
      return el;
    }));
    q("[data-neighbors]").replaceChildren(...legal.map((index) => {
      const el = button(String(game.board[index]), () => act(() => game.move(index)));
      el.setAttribute("data-index", String(index));
      el.disabled = game.won || showGoal || !!slide;
      return el;
    }));
    q("[data-undo]").disabled = !game.history.length || showGoal || !!slide;
    q("[data-hint]").disabled = game.won || showGoal || !!slide;
    status();
    if (game.won && !slide) ctx.message("SOLVED \xB7 " + game.moves + " moves");
  }
  function act(action) {
    if (showGoal || slide) return;
    const before = [...game.board];
    if (!action()) return;
    const destination = game.board.findIndex((value2, i) => value2 && before[i] !== value2), value = game.board[destination], source = before.indexOf(value);
    slide = { value, source, destination, from: world(puzzleCoordinates(source, game.dimensions)), to: world(puzzleCoordinates(destination, game.dimensions)), elapsed: 0, duration: reducedMotion ? 0.08 : 0.34 };
    hovered = null;
    selectedIndex = game.blank;
    ctx.sound?.(game.won ? "win" : "move");
    ctx.message("");
    render();
    follow();
  }
  function directionVector(key2) {
    if (isVolume() && ctx.spatial?.vectorForKey) return ctx.spatial.vectorForKey(key2);
    return { arrowleft: [-1, 0, 0], arrowright: [1, 0, 0], arrowup: [0, 0, -1], arrowdown: [0, 0, 1] }[key2] ?? null;
  }
  function direction(key2) {
    const delta = directionVector(key2);
    if (!delta) return;
    const axis = delta.findIndex((v) => v !== 0);
    if (axis >= 0) act(() => game.moveAxis(["x", "y", "z"][axis], delta[axis]));
  }
  function hint() {
    act(() => game.hint() >= 0);
  }
  function start() {
    const dimensions = isVolume() ? { ...customDimensions } : { x: 4, y: 1, z: 4 };
    game = new NumpuzGame({ dimensions, steps: Number(q("[data-level]").value) });
    showGoal = false;
    hovered = null;
    selectedIndex = game.blank;
    activeSlice = null;
    lastSecond = -1;
    slide = null;
    gimbal = null;
    plaqueQuaternion.fromArray(numpuzPlaqueQuaternion(isVolume() ? { right: [1, 0, 0], up: [0, 1, 0], normal: [0, 0, 1] } : { right: [1, 0, 0], up: [0, 0, -1], normal: [0, 1, 0] }));
    targetQuaternion.copy(plaqueQuaternion);
    buildRails();
    render();
    if (isVolume() && ctx.spatial?.volume) {
      const extents = ["x", "y", "z"].map((a) => dimensions[a] * pitch() + 0.12);
      ctx.spatial.volume({ target: [0, 0, 0], distance: Math.max(...extents) * 2.05 + 2, size: extents });
    } else ctx.frame({ target: [0, 0, 0], distance: 12, position: [0, 12, 1e-3] });
    ctx.message("");
  }
  mode.onchange = start;
  q("[data-level]").onchange = start;
  q("[data-goal]").onclick = () => {
    slide = null;
    showGoal = !showGoal;
    render();
  };
  q("[data-undo]").onclick = () => act(() => game.undo());
  q("[data-hint]").onclick = hint;
  q("[data-restart]").onclick = () => {
    game.restart();
    slide = null;
    showGoal = false;
    hovered = null;
    render();
    follow();
    ctx.message("");
  };
  q("[data-new]").onclick = start;
  ctx.setRules?.("<p>Slide any adjacent tile through the open rails into the empty cell. All six directions connect.</p><p>Match the UP / DOWN diagrams. Numbers run across X, then Z, then Y; the final corner stays empty. U undoes; H gives one solvable step.</p>");
  start();
  return {
    reset: start,
    onCameraChange(basis) {
      if (!isVolume()) return;
      targetQuaternion.fromArray(numpuzPlaqueQuaternion(basis));
      gimbal = { from: plaqueQuaternion.clone(), elapsed: 0 };
      if (reducedMotion) {
        plaqueQuaternion.copy(targetQuaternion);
        gimbal = null;
      }
      drawBoard();
    },
    onSlice(slice) {
      activeSlice = slice;
      if (slice?.mode === "layer" && slice.axis === "y") goalPair = Math.floor(slice.index / 2);
      renderHud();
    },
    selectCell(data) {
      if (validIndex(data?.index)) {
        hovered = data.index;
        selectedIndex = data.index;
        drawBoard();
      }
    },
    getDimensions() {
      return { ...game.dimensions };
    },
    setDimensions(dimensions) {
      if (!validatePuzzleDimensions(dimensions) || dimensions.x * dimensions.y * dimensions.z > 4096) throw new RangeError("XYZ must be positive integers; maximum 4096 cells.");
      customDimensions = { ...dimensions };
      goalPair = 0;
      mode.value = "volume";
      start();
    },
    getSelection() {
      return puzzleCoordinates(selectedIndex ?? game.blank, game.dimensions);
    },
    cellPosition(data) {
      return validIndex(data?.index) ? puzzleCoordinates(data.index, game.dimensions) : null;
    },
    update(dt) {
      game.tick(dt);
      let animated = false, finished = false;
      if (slide) {
        slide.elapsed += dt;
        animated = true;
        if (slide.elapsed >= slide.duration) {
          slide = null;
          finished = true;
        }
      }
      if (gimbal) {
        gimbal.elapsed += dt;
        const t = Math.min(1, gimbal.elapsed / 0.22);
        plaqueQuaternion.slerpQuaternions(gimbal.from, targetQuaternion, t * t * (3 - 2 * t));
        animated = true;
        if (t === 1) gimbal = null;
      }
      if (finished) render();
      else if (animated) drawBoard();
      const second = Math.floor(game.elapsed);
      if (second !== lastSecond) {
        lastSecond = second;
        status();
      }
    },
    onPick(data) {
      if (validIndex(data?.index)) {
        hovered = data.index;
        selectedIndex = data.index;
        act(() => game.move(data.index));
      }
    },
    onHover(data) {
      const next = validIndex(data?.index) ? data.index : null;
      if (next === hovered) return;
      hovered = next;
      drawBoard();
    },
    onKey(key2, event) {
      key2 = key2.toLowerCase();
      if (["arrowleft", "arrowright", "arrowup", "arrowdown"].includes(key2)) {
        event?.preventDefault();
        direction(key2);
      } else if (key2 === "u") act(() => game.undo());
      else if (key2 === "h") hint();
    },
    getState() {
      return { ...game.getState(), showGoal, volume: isVolume(), spatial: isVolume(), blankCoordinates: puzzleCoordinates(game.blank, game.dimensions), pitch: pitch(), worldBlank: world(puzzleCoordinates(game.blank, game.dimensions)), presentation: "connected-wood-rails", plaqueQuaternion: plaqueQuaternion.toArray(), animating: !!slide, slide: slide ? { value: slide.value, source: slide.source, destination: slide.destination, from: [...slide.from], to: [...slide.to], progress: slide.elapsed / slide.duration } : null, goalPlanes: numpuzGoalPlanes(game.dimensions, goalPair) };
    },
    dispose() {
      numerals?.clear();
      numeralGeometry?.dispose();
      hud?.remove();
      ctx.ui.replaceChildren();
    }
  };
}
if (typeof window !== "undefined") Promise.resolve().then(() => __toESM(require_numpuz_v13(), 1));

// ../Cubiverse/src/games/match3-assist.js
var AXES = ["x", "y", "z"];
var axisNumber = (axis) => typeof axis === "number" ? axis : AXES.indexOf(axis);
var cellValid = (p, dims) => Array.isArray(p) && p.length === 3 && p.every((n, a) => Number.isInteger(n) && n >= 0 && n < dims[a]);
var validMove = (pair, dims) => Array.isArray(pair) && pair.length === 2 && pair.every((p) => cellValid(p, dims)) && pair[0].reduce((sum, n, a) => sum + Math.abs(n - pair[1][a]), 0) === 1;
var inPlane = (pair, axis, index) => pair.every((p) => p[axis] === index);
var pairCopy = (pair) => pair.map((p) => [...p]);
var compare = (a, b) => {
  for (let i = 0; i < Math.max(a.length, b.length); i++) {
    const d = (a[i] ?? 0) - (b[i] ?? 0);
    if (d) return d;
  }
  return 0;
};
function matchFacing(basis) {
  const normal = basis?.normal ?? [0, 0, 1];
  let axis = 2;
  for (const a of [0, 1]) if (Math.abs(normal[a] ?? 0) > Math.abs(normal[axis] ?? 0)) axis = a;
  return { axis: AXES[axis], sign: (normal[axis] ?? 1) < 0 ? -1 : 1 };
}
var turnCost = (face, current) => face.axis === current.axis ? face.sign === current.sign ? 0 : 2 : 1;
function chooseMatchAssist({ moves = [], dims, slice = { mode: null }, basis, idle = 0, allowSlice = true, spatial = true } = {}) {
  if (!Array.isArray(dims) || dims.length !== 3 || dims.some((n) => !Number.isInteger(n) || n < 1)) return null;
  const legal = moves.filter((pair) => validMove(pair, dims));
  if (!legal.length) return null;
  if (!spatial) return idle >= 5 ? { type: "pulse", pair: pairCopy(legal[0]) } : null;
  const facing = matchFacing(basis), facingAxis = axisNumber(facing.axis);
  if (slice?.mode) {
    const axis = axisNumber(slice.axis), local = slice.mode === "layer" && axis >= 0 ? legal.find((pair) => inPlane(pair, axis, slice.index)) : null;
    if (local) return idle >= 5 ? { type: "pulse", pair: pairCopy(local) } : null;
    if (!allowSlice || idle < 0.9) return null;
    const choices = [];
    legal.forEach((pair, order) => {
      for (let a = 0; a < 3; a++) if (pair[0][a] === pair[1][a]) {
        const index = pair[0][a], sign = a === facingAxis ? facing.sign : index >= (dims[a] - 1) / 2 ? 1 : -1, face = { axis: AXES[a], sign };
        choices.push({ type: "slice", ...face, index, pair: pairCopy(pair), rank: [a === axis ? 0 : 1, turnCost(face, facing), a === axis ? Math.abs(index - slice.index) : 0, a, index, order] });
      }
    });
    choices.sort((a, b) => compare(a.rank, b.rank));
    const best2 = choices[0];
    if (best2) {
      const { rank, ...result } = best2;
      return result;
    }
    return null;
  }
  const outside = [];
  for (let axis = 0; axis < 3; axis++) for (const sign of [1, -1]) {
    const index = sign === 1 ? dims[axis] - 1 : 0, pair = legal.find((move) => inPlane(move, axis, index));
    if (!pair) continue;
    const face = { axis: AXES[axis], sign };
    outside.push({ ...face, index, pair: pairCopy(pair), rank: [turnCost(face, facing), axis, sign === 1 ? 0 : 1] });
  }
  if (outside.length) {
    outside.sort((a, b) => compare(a.rank, b.rank));
    const { rank, ...best2 } = outside[0], current = turnCost(best2, facing) === 0;
    if (idle < (current ? 5 : 0.9)) return null;
    return { type: current ? "pulse" : "face", ...best2 };
  }
  if (!allowSlice || idle < 3) return null;
  const inside3 = [];
  legal.forEach((pair, order) => {
    for (let a = 0; a < 3; a++) if (pair[0][a] === pair[1][a] && pair[0][a] > 0 && pair[0][a] < dims[a] - 1) {
      const index = pair[0][a], sign = a === facingAxis ? facing.sign : index >= (dims[a] - 1) / 2 ? 1 : -1, face = { axis: AXES[a], sign };
      inside3.push({ type: "slice", ...face, index, pair: pairCopy(pair), rank: [turnCost(face, facing), a, sign > 0 ? dims[a] - 1 - index : index, order] });
    }
  });
  inside3.sort((a, b) => compare(a.rank, b.rank));
  const best = inside3[0];
  if (best) {
    const { rank, ...result } = best;
    return result;
  }
  return null;
}
var MatchAssist = class {
  constructor() {
    this.reset();
  }
  reset() {
    this.idle = 0;
    this.held = false;
    this.suppressSlice = false;
    this.issued = false;
    this.pending = null;
    this.active = false;
    this.nextDecision = 0.9;
  }
  interrupt(event = {}) {
    this.idle = 0;
    this.issued = false;
    this.pending = null;
    this.active = false;
    this.nextDecision = 0.9;
    if (event.type === "pointerdown") this.held = true;
    else if (event.type === "pointerup") this.held = false;
    else if (typeof event.held === "boolean") this.held = event.held;
  }
  globalView() {
    this.interrupt();
    this.suppressSlice = true;
  }
  manualSlice() {
    this.interrupt();
    this.suppressSlice = false;
  }
  advance(dt, context = {}) {
    if (this.held || context.blocked) {
      this.idle = 0;
      this.pending = null;
      this.issued = false;
      this.active = false;
      this.nextDecision = 0.9;
      return null;
    }
    this.idle += Math.max(0, Number.isFinite(dt) ? dt : 0);
    if (this.pending) {
      this.pending.remaining -= Math.max(0, dt);
      if (this.pending.remaining > 0) return null;
      const pair = pairCopy(this.pending.pair);
      this.pending = null;
      this.active = true;
      return { type: "pulse", pair };
    }
    if (this.issued || this.idle < this.nextDecision) return null;
    const choice = chooseMatchAssist({ ...context, idle: this.idle, allowSlice: !this.suppressSlice });
    if (choice) this.issued = true;
    else this.nextDecision = this.idle < 3 ? 3 : this.idle < 5 ? 5 : this.idle + 0.5;
    return choice;
  }
  applied(action, accepted = true, duration = 0.85) {
    if (!accepted) {
      this.interrupt();
      return;
    }
    if (action.type === "pulse") {
      this.active = true;
      return;
    }
    this.pending = { pair: pairCopy(action.pair), remaining: Math.max(0, duration) };
  }
  snapshot() {
    return { idle: this.idle, held: this.held, suppressSlice: this.suppressSlice, active: this.active, turning: !!this.pending };
  }
};
var MatchMoveCache = class {
  constructor(compute) {
    this.compute = compute;
    this.revision = null;
    this.board = null;
    this.value = [];
    this.computations = 0;
  }
  read(board, dims, revision) {
    if (board !== this.board || revision !== this.revision) {
      this.board = board;
      this.revision = revision;
      this.value = this.compute(board, dims);
      this.computations++;
    }
    return this.value;
  }
};

// ../Cubiverse/src/games/match3.js
if (typeof window !== "undefined") Promise.resolve().then(() => __toESM(require_match3_v13(), 1));
var GEM_COLORS = ["#ec7755", "#deae76", "#f4d145", "#68be72", "#63bde3", "#b48bd1"];
var matchIndex = ([x, y, z], [w, h]) => x + w * (y + h * z);
var matchCoord = (i, [w, h]) => [i % w, Math.floor(i / w) % h, Math.floor(i / (w * h))];
var inBounds = (p, dims) => p.every((v, i) => Number.isInteger(v) && v >= 0 && v < dims[i]);
var sameCell = (a, b) => a?.every((v, i) => v === b?.[i]);
function areAdjacent(a, b) {
  return a.length === 3 && b.length === 3 && a.reduce((sum, v, i) => sum + Math.abs(v - b[i]), 0) === 1;
}
function findMatches(board, dims) {
  const marked = /* @__PURE__ */ new Set(), runs = [];
  for (let axis = 0; axis < 3; axis++) {
    if (dims[axis] < 3) continue;
    for (let i = 0; i < board.length; i++) {
      const start = matchCoord(i, dims);
      if (start[axis] !== 0) continue;
      let cells = [], previous = -1;
      const flush = () => {
        if (cells.length >= 3) {
          runs.push([...cells]);
          for (const cell of cells) marked.add(cell);
        }
      };
      for (let t = 0; t <= dims[axis]; t++) {
        const p = [...start];
        p[axis] = t;
        const index = matchIndex(p, dims), value = t === dims[axis] ? -2 : board[index];
        if (value >= 0 && value === previous) cells.push(index);
        else {
          flush();
          cells = value >= 0 ? [index] : [];
          previous = value;
        }
      }
    }
  }
  return { cells: [...marked], runs };
}
function swap(board, i, j) {
  [board[i], board[j]] = [board[j], board[i]];
}
function legalMatchMoves(board, dims, limit = Infinity) {
  const result = [];
  const matchedAt = (p) => {
    const value = board[matchIndex(p, dims)];
    return [0, 1, 2].some((axis) => {
      let run = 1;
      for (const dir of [-1, 1]) for (let step = 1; step < dims[axis]; step++) {
        const q = [...p];
        q[axis] += step * dir;
        if (!inBounds(q, dims) || board[matchIndex(q, dims)] !== value) break;
        run++;
      }
      return run >= 3;
    });
  };
  for (let i = 0; i < board.length; i++) {
    const a = matchCoord(i, dims);
    for (let axis = 0; axis < 3; axis++) {
      const b = [...a];
      b[axis]++;
      if (!inBounds(b, dims)) continue;
      const j = matchIndex(b, dims);
      if (board[i] === board[j]) continue;
      swap(board, i, j);
      const matches = matchedAt(a) || matchedAt(b);
      swap(board, i, j);
      if (matches) {
        result.push([a, b]);
        if (result.length >= limit) return result;
      }
    }
  }
  return result;
}
function freshMatchBoard(dims, rng = Math.random, colors = 6) {
  if (!Array.isArray(dims) || dims.length !== 3 || dims.some((n) => !Number.isSafeInteger(n) || n < 1)) throw new RangeError("XYZ must be positive integers.");
  const board = new Int8Array(dims.reduce((a, b) => a * b, 1)).fill(-1);
  for (let attempt = 0; attempt < 64; attempt++) {
    board.fill(-1);
    for (let i = 0; i < board.length; i++) {
      const p = matchCoord(i, dims), start = Math.floor(rng() * colors) % colors;
      for (let offset = 0; offset < colors; offset++) {
        const value = (start + offset) % colors;
        const forbidden = [0, 1, 2].some((axis2) => {
          if (p[axis2] < 2) return false;
          const q = [...p], r = [...p];
          q[axis2]--;
          r[axis2] -= 2;
          return board[matchIndex(q, dims)] === value && board[matchIndex(r, dims)] === value;
        });
        if (!forbidden) {
          board[i] = value;
          break;
        }
      }
    }
    if (legalMatchMoves(board, dims, 1).length || !dims.some((n) => n >= 3)) return board;
  }
  for (let i = 0; i < board.length; i++) {
    const [x, y, z] = matchCoord(i, dims);
    board[i] = (x + 2 * y + 3 * z) % colors;
  }
  const axis = dims.findIndex((n) => n >= 3), cross4 = dims.findIndex((n, i) => i !== axis && n >= 2);
  const set = (along, across, value) => {
    const p = [0, 0, 0];
    p[axis] = along;
    if (cross4 >= 0) p[cross4] = across;
    board[matchIndex(p, dims)] = value;
  };
  if (axis >= 0 && cross4 >= 0) {
    set(0, 0, 0);
    set(1, 0, 1);
    set(2, 0, 0);
    set(1, 1, 0);
  } else if (axis >= 0 && dims[axis] >= 4) {
    set(0, 0, 0);
    set(1, 0, 1);
    set(2, 0, 0);
    set(3, 0, 0);
  }
  if (findMatches(board, dims).cells.length) {
    let seed = 98537;
    return freshMatchBoard(dims, () => (seed = seed * 1664525 + 1013904223 >>> 0) / 4294967296, colors);
  }
  return board;
}
function gravityRefill(board, dims, axis = 1, rng = Math.random, colors = 6, direction = -1) {
  const moves = [];
  for (let i = 0; i < board.length; i++) {
    const start = matchCoord(i, dims);
    if (start[axis] !== 0) continue;
    const positions = Array.from({ length: dims[axis] }, (_, n) => {
      const p = [...start];
      p[axis] = direction < 0 ? n : dims[axis] - 1 - n;
      return p;
    });
    const kept = positions.map((p) => ({ p, value: board[matchIndex(p, dims)] })).filter((v) => v.value >= 0);
    for (let n = 0; n < positions.length; n++) {
      const to = positions[n], value = n < kept.length ? kept[n].value : Math.floor(rng() * colors) % colors;
      board[matchIndex(to, dims)] = value;
      const from = n < kept.length ? kept[n].p : to.map((v, a) => a === axis ? direction < 0 ? dims[axis] + n - kept.length : -1 - n + kept.length : v);
      moves.push({ from, to, value });
    }
  }
  return moves;
}
function reshuffleMatchBoard(board, dims, rng = Math.random) {
  const original = [...board];
  for (let attempt = 0; attempt < 80; attempt++) {
    for (let i = board.length - 1; i > 0; i--) {
      const j = Math.floor(rng() * (i + 1));
      swap(board, i, j);
    }
    if (!findMatches(board, dims).cells.length && legalMatchMoves(board, dims, 1).length) return true;
  }
  board.set(freshMatchBoard(dims, rng));
  return original.some((v, i) => v !== board[i]);
}
function createMatchState(spatial = true, rng = Math.random, dimensions) {
  const dims = dimensions ? [...dimensions] : spatial ? [5, 5, 3] : [8, 1, 8];
  return { spatial, dims, board: freshMatchBoard(dims, rng), score: 0, moves: 30, goal: spatial ? Math.max(300, Math.round(dims.reduce((a, b) => a * b, 1) * 32 / 100) * 100) : 2400, over: false, won: false, totalCleared: 0, maxCombo: 0, reshuffles: 0, timeLeft: 120, timeLimit: 120, chain: 0, chainLeft: 0, charge: 0, powers: { row: 1, burst: 1, time: 1 }, lineClears: 0, blastClears: 0, endReason: null };
}
function ensureRound(state) {
  state.timeLeft ??= 120;
  state.timeLimit ??= 120;
  state.chain ??= 0;
  state.chainLeft ??= 0;
  state.charge ??= 0;
  state.powers ??= { row: 1, burst: 1, time: 1 };
  state.lineClears ??= 0;
  state.blastClears ??= 0;
}
function finishRound(state) {
  state.won = state.score >= state.goal;
  state.over = state.won || state.moves <= 0 || state.timeLeft <= 0;
  state.endReason = state.won ? "goal" : state.timeLeft <= 0 ? "time" : state.moves <= 0 ? "moves" : null;
}
function tickMatchState(state, dt) {
  ensureRound(state);
  if (state.over) return false;
  state.timeLeft = Math.max(0, state.timeLeft - Math.max(0, dt));
  state.chainLeft = Math.max(0, state.chainLeft - Math.max(0, dt));
  if (!state.chainLeft) state.chain = 0;
  finishRound(state);
  return state.over;
}
function expandMatchRewards(matches, dims) {
  const cells = new Set(matches.cells), lines = [], blasts = [];
  const line2 = (center, axis) => {
    const p = matchCoord(center, dims), run = [];
    for (let n = 0; n < dims[axis]; n++) {
      const q = [...p];
      q[axis] = n;
      const index = matchIndex(q, dims);
      cells.add(index);
      run.push(index);
    }
    lines.push(run);
  };
  for (const run of matches.runs) {
    if (run.length < 4) continue;
    const first = matchCoord(run[0], dims), last = matchCoord(run.at(-1), dims), axis = first.findIndex((n, i) => n !== last[i]);
    if (run.length >= 5) {
      const center = run[Math.floor(run.length / 2)];
      blasts.push(center);
      for (let a = 0; a < 3; a++) line2(center, a);
    } else line2(run[Math.floor(run.length / 2)], axis);
  }
  return { cells: [...cells], lines, blasts };
}
function resolveMatchCascade(state, initial, rng, frames) {
  let matches = initial, combo = 0;
  const initialScore = state.score;
  while (matches.cells.length && combo < 32) {
    combo++;
    const reward = expandMatchRewards(matches, state.dims), multiplier = combo * Math.max(1, state.chain);
    const points = reward.cells.length * 10 * multiplier + reward.lines.length * 50 + reward.blasts.length * 150;
    state.score += points;
    state.totalCleared += reward.cells.length;
    state.lineClears += reward.lines.length;
    state.blastClears += reward.blasts.length;
    frames.push({ type: "clear", board: [...state.board], ...reward, combo, multiplier, points, duration: reward.lines.length ? 0.46 : 0.29 });
    for (const index of reward.cells) state.board[index] = -1;
    const fall = gravityRefill(state.board, state.dims, state.spatial ? 1 : 2, rng, 6, state.spatial ? -1 : 1);
    frames.push({ type: "fall", board: [...state.board], fall, combo, duration: 0.31 });
    matches = findMatches(state.board, state.dims);
  }
  if (matches.cells.length) {
    state.board.set(freshMatchBoard(state.dims, rng));
    state.reshuffles++;
    frames.push({ type: "shuffle", board: [...state.board], duration: 0.2 });
  }
  if (!legalMatchMoves(state.board, state.dims, 1).length) {
    reshuffleMatchBoard(state.board, state.dims, rng);
    state.reshuffles++;
    frames.push({ type: "shuffle", board: [...state.board], duration: 0.25 });
  }
  state.maxCombo = Math.max(state.maxCombo, combo);
  state.charge += combo;
  while (state.charge >= 5) {
    state.charge -= 5;
    state.powers.burst = Math.min(3, state.powers.burst + 1);
    state.timeLeft = Math.min(state.timeLimit, state.timeLeft + 5);
  }
  finishRound(state);
  return { valid: true, frames, combo, points: state.score - initialScore };
}
function playMatchSwap(state, a, b, rng = Math.random) {
  ensureRound(state);
  if (state.over || !inBounds(a, state.dims) || !inBounds(b, state.dims) || !areAdjacent(a, b)) return { valid: false, reason: "adjacent", frames: [] };
  const board = state.board, i = matchIndex(a, state.dims), j = matchIndex(b, state.dims), before = [...board];
  swap(board, i, j);
  let matches = findMatches(board, state.dims);
  if (!matches.cells.includes(i) && !matches.cells.includes(j)) {
    swap(board, i, j);
    return { valid: false, reason: "no-match", frames: [{ type: "swap", board: before, a, b, reverse: false, duration: 0.16 }, { type: "swap", board: before, a, b, reverse: true, duration: 0.16 }] };
  }
  const frames = [{ type: "swap", board: before, a, b, reverse: false, duration: 0.16 }];
  state.moves--;
  state.chain = state.chainLeft > 0 ? Math.min(5, state.chain + 1) : 1;
  state.chainLeft = 7;
  return resolveMatchCascade(state, matches, rng, frames);
}
function useMatchPower(state, power, cell = [0, 0, 0], axis = 0, rng = Math.random) {
  ensureRound(state);
  if (state.over || !state.powers[power]) return { valid: false, reason: "unavailable", frames: [] };
  if (power === "time") {
    state.powers.time--;
    state.timeLeft += 10;
    state.timeLimit = Math.max(state.timeLimit, state.timeLeft);
    return { valid: true, frames: [], combo: 0, points: 0, power };
  }
  if (!inBounds(cell, state.dims)) return { valid: false, reason: "cell", frames: [] };
  const cells = [];
  if (power === "row") {
    axis = Math.max(0, Math.min(2, axis));
    for (let n = 0; n < state.dims[axis]; n++) {
      const p = [...cell];
      p[axis] = n;
      cells.push(matchIndex(p, state.dims));
    }
  } else if (power === "burst") {
    for (let i = 0; i < state.board.length; i++) if (matchCoord(i, state.dims).every((n, a) => Math.abs(n - cell[a]) <= 1)) cells.push(i);
  } else return { valid: false, reason: "power", frames: [] };
  state.powers[power]--;
  state.chain = Math.max(1, state.chain);
  state.chainLeft = 7;
  const result = resolveMatchCascade(state, { cells, runs: [] }, rng, []);
  result.power = power;
  if (power === "row") state.lineClears++;
  else state.blastClears++;
  if (result.frames[0]) {
    result.frames[0].power = power;
    result.frames[0].duration = 0.48;
    if (power === "row") result.frames[0].lines = [cells];
    else result.frames[0].blasts = [matchIndex(cell, state.dims)];
  }
  return result;
}
function matchDirection(key2, plane = "xz") {
  const maps = { xy: { arrowleft: [-1, 0, 0], arrowright: [1, 0, 0], arrowup: [0, 1, 0], arrowdown: [0, -1, 0] }, xz: { arrowleft: [-1, 0, 0], arrowright: [1, 0, 0], arrowup: [0, 0, -1], arrowdown: [0, 0, 1] }, yz: { arrowleft: [0, 0, 1], arrowright: [0, 0, -1], arrowup: [0, 1, 0], arrowdown: [0, -1, 0] } };
  return maps[plane]?.[String(key2).toLowerCase()] ?? null;
}
function createGame6(ctx) {
  const THREE4 = ctx.THREE, doc = ctx.ui.ownerDocument, CAPACITY = 4096, SPACING = 1.16;
  let spatial = true, dimensions = [5, 5, 3], state, selected = null, hintCells = [], frames = [], elapsed = 0, pending = null, disposed = false, currentSlice = { mode: null }, clock = 0, lastHud = "", lastStats = "", cameraPreset = "volume", lastSoundFrame = null, notice = "", noticeLife = 0, announced = false, renderClock = 0;
  let boardRevision = 0, automaticHint = false, applyingAssist = false;
  const assist = new MatchAssist(), moveCache = new MatchMoveCache(legalMatchMoves);
  const cachedMoves = () => moveCache.read(state.board, state.dims, boardRevision);
  const reducedMotion = typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
  const resources = /* @__PURE__ */ new Set(), meshes = [], gems = [], ears = [], own = (r) => (resources.add(r), r);
  const dummy = THREE4 ? new THREE4.Object3D() : null, bodyQ = THREE4 ? new THREE4.Quaternion() : null, faceQ = THREE4 ? new THREE4.Quaternion() : null, partQ = THREE4 ? new THREE4.Quaternion() : null, vec = THREE4 ? new THREE4.Vector3() : null;
  const identityQ = THREE4 ? new THREE4.Quaternion() : null;
  const counts = new Uint32Array(6), earCounts = new Uint32Array(6);
  let grid, eyes, pupils, muzzles, noses, sparkles, selection, hints, ribbons;
  const hud = ctx.hud ? doc.createElement("div") : null;
  const hudInfo = hud ? doc.createElement("div") : null, powerButtons = {};
  if (hud) {
    hud.className = "game-hud v13-match3-hud";
    hud.append(hudInfo);
    ctx.hud.append(hud);
  }
  const world = (p) => p.map((n, a) => (n - (state.dims[a] - 1) / 2) * SPACING);
  function instanced(geometry, material2, capacity, name, pick2 = false) {
    const mesh = new THREE4.InstancedMesh(geometry, material2, capacity);
    mesh.name = name;
    mesh.count = 0;
    mesh.frustumCulled = false;
    mesh.instanceMatrix.setUsage(THREE4.DynamicDrawUsage);
    mesh.userData[pick2 ? "pickCells" : "sliceCells"] = [];
    ctx.group.add(mesh);
    meshes.push(mesh);
    return mesh;
  }
  function place(mesh, i, position, scale, cell, rotation = null, offset = null) {
    dummy.position.set(...position);
    if (offset) {
      vec.set(...offset);
      if (rotation) vec.applyQuaternion(rotation);
      dummy.position.add(vec);
    }
    dummy.quaternion.copy(rotation ?? identityQ);
    dummy.scale.set(...scale);
    dummy.updateMatrix();
    mesh.setMatrixAt(i, dummy.matrix);
    const cells = mesh.userData.pickCells ?? mesh.userData.sliceCells;
    cells[i] = { cell };
    const facing = mesh.geometry.getAttribute("m3Facing");
    if (facing) {
      vec.set(0, 0, 1).applyQuaternion(rotation ?? identityQ);
      facing.setXYZ(i, vec.x, vec.y, vec.z);
    }
  }
  function material(color, extra = {}) {
    return own(new THREE4.MeshStandardMaterial({ color, roughness: 0.33, metalness: 0.04, ...extra }));
  }
  function faceBatch(geometry, color, capacity, name) {
    const g = own(geometry.clone());
    g.setAttribute("m3Facing", new THREE4.InstancedBufferAttribute(new Float32Array(capacity * 3), 3).setUsage(THREE4.DynamicDrawUsage));
    const m = material(color);
    m.onBeforeCompile = (shader) => {
      shader.vertexShader = "attribute vec3 m3Facing; varying float m3FaceVisible;\n" + shader.vertexShader;
      shader.vertexShader = shader.vertexShader.replace("#include <project_vertex>", "#include <project_vertex>\nm3FaceVisible = dot(normalize(mat3(modelViewMatrix) * m3Facing), normalize(-mvPosition.xyz));");
      shader.fragmentShader = "varying float m3FaceVisible;\n" + shader.fragmentShader;
      shader.fragmentShader = shader.fragmentShader.replace("#include <clipping_planes_fragment>", "#include <clipping_planes_fragment>\nif (m3FaceVisible < 0.12) discard;");
    };
    m.customProgramCacheKey = () => "m3-single-face-v131";
    return instanced(g, m, capacity, name);
  }
  if (THREE4 && ctx.group) {
    const body = own(new THREE4.SphereGeometry(1, 12, 8)), detail = own(new THREE4.SphereGeometry(1, 8, 5)), cone = own(new THREE4.ConeGeometry(1, 2, 5));
    for (let type = 0; type < 6; type++) {
      gems.push(instanced(body, material(GEM_COLORS[type]), CAPACITY, `match3-jewel-${type}`, true));
      ears.push(instanced(type === 0 || type === 5 ? cone : detail, material(GEM_COLORS[type]), CAPACITY * 2, `match3-ears-${type}`));
    }
    const box = own(new THREE4.BoxGeometry(1, 1, 1));
    grid = instanced(box, own(new THREE4.MeshBasicMaterial({ color: "#345669", transparent: true, opacity: 0.52, depthWrite: false })), CAPACITY * 12, "match3-open-grid");
    ribbons = instanced(box, own(new THREE4.MeshBasicMaterial({ color: "#e8fff0", transparent: true, opacity: 0.65, depthWrite: false })), CAPACITY * 3, "match3-line-rays");
    eyes = faceBatch(detail, "#fffdf0", CAPACITY * 2, "match3-animal-eyes");
    pupils = faceBatch(detail, "#183147", CAPACITY * 2, "match3-animal-pupils");
    muzzles = faceBatch(detail, "#fff0ce", CAPACITY, "match3-animal-muzzles");
    noses = faceBatch(detail, "#5e3a51", CAPACITY, "match3-animal-noses");
    const octa = own(new THREE4.OctahedronGeometry(1, 0));
    sparkles = instanced(octa, own(new THREE4.MeshBasicMaterial({ color: "#fff0a2", transparent: true, depthWrite: false })), CAPACITY * 7, "match3-sparkle-burst");
    const torus = own(new THREE4.TorusGeometry(0.49, 0.027, 5, 24));
    selection = instanced(torus, own(new THREE4.MeshBasicMaterial({ color: "#ffce53", depthTest: false })), 3, "match3-selection-orbits");
    hints = instanced(torus, own(new THREE4.MeshBasicMaterial({ color: "#a1ffe6", depthTest: false })), 6, "match3-hint-orbits");
    grid.renderOrder = 1;
    gems.forEach((m) => m.renderOrder = 10);
    ears.forEach((m) => m.renderOrder = 11);
    muzzles.renderOrder = 20;
    eyes.renderOrder = 30;
    pupils.renderOrder = 40;
    noses.renderOrder = 41;
    selection.renderOrder = 60;
    hints.renderOrder = 60;
    ribbons.renderOrder = 65;
    sparkles.renderOrder = 70;
  }
  function button(text2, action, title = text2) {
    const b = doc.createElement("button");
    b.textContent = text2;
    b.className = "small-button";
    b.setAttribute("aria-label", title);
    b.onclick = () => {
      onUserAction({ type: "control" });
      action();
    };
    return b;
  }
  function row(...children) {
    const el = doc.createElement("div");
    el.className = "control-row";
    el.append(...children);
    ctx.ui.append(el);
    return el;
  }
  const mode = doc.createElement("select");
  for (const [value, label] of [["3d", "3D"], ["2d", "8 \xD7 8"]]) {
    const option = doc.createElement("option");
    option.value = value;
    option.textContent = label;
    mode.append(option);
  }
  mode.setAttribute("aria-label", "Match Three mode");
  mode.onchange = () => {
    spatial = mode.value === "3d";
    reset();
  };
  row(mode, button("\u21BB", reset, "Restart"));
  row(button("\u2600 H", hint, "Hint"), button("\xD7", () => {
    selected = null;
    hintCells = [];
    render();
  }, "Clear selection"));
  row(...[["\u2190", "ArrowLeft"], ["\u2191", "ArrowUp"], ["\u2193", "ArrowDown"], ["\u2192", "ArrowRight"]].map(([label, key2]) => button(label, () => directionAction(key2))));
  row(...[["W", "up"], ["S", "down"], ["A", "left"], ["D", "right"]].map(([label, direction]) => button(label, () => ctx.spatial?.turn?.(direction), "Rotate view")));
  row(button("\u2194 1", () => power("row"), "Line clear"), button("\u2726 2", () => power("burst"), "Burst"), button("\u25F7 3", () => power("time"), "Add 10 seconds"));
  if (hud) {
    const tray = doc.createElement("div");
    tray.className = "m3-power-tray";
    for (const [name, icon, key2, title] of [["row", "\u2194", "1", "Line clear"], ["burst", "\u2726", "2", "Burst"], ["time", "+10s", "3", "Add 10 seconds"]]) {
      const b = button("", () => power(name), title);
      b.setAttribute("data-match-power", name);
      const symbol = doc.createElement("span"), keycap = doc.createElement("kbd"), count = doc.createElement("b");
      symbol.textContent = icon;
      keycap.textContent = key2;
      b.append(symbol, keycap, count);
      tray.append(b);
      powerButtons[name] = { button: b, count };
    }
    hud.append(tray);
  }
  const statusEl = doc.createElement("p");
  statusEl.className = "hint";
  ctx.ui.append(statusEl);
  ctx.setRules?.("<p>Swap neighbours. Match 3 on X, Y or Z. Match 4 \u2192 full line. Match 5 \u2192 three-axis blast.</p><p>120 seconds \xB7 30 moves. Reach the star target. Fast matches multiply points. Five cascades refill a burst and add 5 seconds.</p><p>1 line \xB7 2 burst \xB7 3 +10s \xB7 H hint</p>");
  function initCamera() {
    const size = state.dims.map((n) => n * SPACING), distance = Math.max(...size) * 1.65;
    if (spatial && ctx.spatial?.volume) ctx.spatial.volume({ target: [0, 0, 0], distance, size });
    else ctx.frame({ target: [0, 0, 0], distance: spatial ? distance : 15, position: spatial ? [distance * 0.7, distance * 0.5, distance] : [0, 15, 1e-3] });
  }
  function showNotice(text2) {
    notice = text2;
    noticeLife = 1.5;
  }
  function renderHud() {
    const progress = Math.min(100, state.score / state.goal * 100), time = Math.ceil(state.timeLeft), pct = state.charge / 5 * 100, terminal = state.over ? state.won ? "STAR PARTY!" : state.endReason === "time" ? "TIME UP" : "OUT OF MOVES" : "";
    const markup = `<div class="m3-scoreboard"><div class="m3-time ${time < 20 ? "urgent" : ""}"><span>\u25F7</span><strong>${time}</strong></div><div class="m3-score"><span class="m3-stars">${"\u2605".repeat(Math.min(3, Math.floor(progress / 33.33)))}${"\u2606".repeat(3 - Math.min(3, Math.floor(progress / 33.33)))}</span><strong>${state.score.toLocaleString()}</strong><div class="m3-progress"><i style="width:${progress}%"></i></div><small>/${state.goal.toLocaleString()}</small></div><div class="m3-moves"><span>\u2194</span><strong>${state.moves}</strong></div></div><div class="m3-combo-meter"><span>\u2726 <b>${Math.max(1, state.chain)}\xD7</b></span><div><i style="width:${Math.round(state.chainLeft / 7 * 100)}%"></i></div><span class="m3-charge" style="--charge:${pct}%">${state.charge}/5</span></div>${terminal ? `<div class="m3-end ${state.won ? "won" : ""}"><span>${state.won ? "\u2605 \u2605 \u2605" : "\u25F7"}</span><strong>${terminal}</strong><small>${state.score.toLocaleString()} / ${state.goal.toLocaleString()}</small><button data-match-restart aria-label="Play again">\u21BB</button></div>` : noticeLife > 0 ? `<div class="m3-praise">${notice}</div>` : ""}`;
    if (hudInfo && markup !== lastHud) {
      hudInfo.innerHTML = markup;
      lastHud = markup;
      const restart = hudInfo.querySelector?.("[data-match-restart]");
      if (restart) restart.onclick = reset;
    }
    for (const [name, control] of Object.entries(powerButtons)) {
      control.button.disabled = state.over || !state.powers[name];
      control.count.textContent = state.powers[name];
    }
    const stats = { Score: state.score, Goal: state.goal, Time: time, Moves: state.moves, Combo: `\xD7${state.maxCombo}`, Lines: state.lineClears }, statsKey = JSON.stringify(stats);
    if (statsKey !== lastStats) {
      ctx.setStats(stats);
      lastStats = statsKey;
    }
    statusEl.textContent = selected ? selected.map((n) => n + 1).join(" / ") : "";
  }
  function render() {
    if (!state || disposed) return;
    const current = frames[0], board = current?.board ?? state.board, t = current ? Math.min(1, elapsed / current.duration) : 1;
    const clear = new Set(current?.cells ?? []), fallMap = new Map((current?.fall ?? []).map((m) => [matchIndex(m.to, state.dims), m]));
    let gridCount = 0, faceCount = 0, particleCount = 0, selectionCount = 0, hintCount = 0;
    counts.fill(0);
    earCounts.fill(0);
    const fallback = [];
    for (let i = 0; i < board.length; i++) {
      const cell = matchCoord(i, state.dims), base = world(cell), value = board[i];
      let position = [...base], scale = 1;
      if (grid) for (let axis = 0; axis < 3; axis++) for (const a of [-1, 1]) for (const b of [-1, 1]) {
        const axes4 = [0, 1, 2].filter((n) => n !== axis), offset = [0, 0, 0], size = [0.028, 0.028, 0.028];
        offset[axes4[0]] = a * SPACING / 2;
        offset[axes4[1]] = b * SPACING / 2;
        size[axis] = SPACING;
        place(grid, gridCount++, base, size, cell, null, offset);
      }
      if (value < 0) continue;
      if (current?.type === "swap" && (sameCell(cell, current.a) || sameCell(cell, current.b))) {
        const other = sameCell(cell, current.a) ? current.b : current.a, u = t * t * (3 - 2 * t), k = current.reverse ? 1 - u : u, end = world(other);
        position = position.map((n, a) => n + (end[a] - n) * k);
      }
      if (current?.type === "clear" && clear.has(i)) scale = t < 0.23 ? 1 + t : Math.max(1e-3, 1 - (t - 0.23) / 0.77);
      if (current?.type === "fall") {
        const m = fallMap.get(i);
        if (m) {
          const from = world(m.from);
          position = position.map((n, a) => from[a] + (n - from[a]) * (1 - (1 - t) ** 3));
        }
      }
      const bob = reducedMotion ? 0 : Math.sin(clock * 1.5 + i * 0.71) * 0.035;
      position[1] += bob;
      const isSelected = sameCell(selected, cell), isHint = hintCells.some((p) => sameCell(p, cell));
      if (isSelected) scale *= 1.09;
      if (gems.length) {
        bodyQ.setFromEuler(new THREE4.Euler(reducedMotion ? 0 : Math.sin(clock * 0.3 + i) * 0.055, reducedMotion ? 0 : clock * 0.2 + i * 0.33, 0));
        const n = counts[value]++, radius = value === 3 ? [0.41, 0.35, 0.38] : value === 2 ? [0.36, 0.4, 0.36] : [0.39, 0.38, 0.39];
        place(gems[value], n, position, radius.map((r) => r * scale), cell, bodyQ);
        for (const side of [-1, 1]) {
          const earScale = value === 0 || value === 5 ? [0.12, 0.15, 0.12] : value === 3 ? [0.15, 0.13, 0.14] : value === 2 ? [0.085, 0.13, 0.08] : [0.15, 0.16, 0.13];
          place(ears[value], earCounts[value]++, position, earScale.map((n2) => n2 * scale), cell, bodyQ, [side * (value === 2 ? 0.09 : 0.25) * scale, 0.33 * scale, 0]);
        }
        {
          faceQ.copy(bodyQ);
          for (const sign of [-1, 1]) {
            const eye = faceCount * 2 + (sign === 1 ? 1 : 0);
            place(eyes, eye, position, [0.067, 0.077, 0.034].map((n2) => n2 * scale), cell, faceQ, [sign * 0.12 * scale, 0.07 * scale, 0.356 * scale]);
            place(pupils, eye, position, [0.029, 0.044, 0.018].map((n2) => n2 * scale), cell, faceQ, [(sign * 0.12 + 8e-3) * scale, 0.065 * scale, 0.387 * scale]);
          }
          place(muzzles, faceCount, position, [0.125, 0.061, 0.035].map((n2) => n2 * scale), cell, faceQ, [0, -0.105 * scale, 0.361 * scale]);
          place(noses, faceCount, position, [value === 2 ? 0.055 : 0.03, 0.025, 0.027].map((n2) => n2 * scale), cell, faceQ, [0, -0.077 * scale, 0.394 * scale]);
          faceCount++;
        }
        for (const [active, target] of [[isSelected, selection], [isHint, hints]]) if (active) for (let a = 0; a < 3; a++) {
          partQ.setFromEuler(new THREE4.Euler(a === 1 ? Math.PI / 2 : 0, a === 2 ? Math.PI / 2 : 0, clock * 0.25));
          const pulse = automaticHint && target === hints && !reducedMotion ? 1 + 0.09 * Math.sin(clock * 4) : 1;
          place(target, target === selection ? selectionCount++ : hintCount++, position, [pulse, pulse, pulse], cell, partQ);
        }
        if (current?.type === "clear" && clear.has(i)) for (let n2 = 0; n2 < 7; n2++) {
          const angle = n2 * 2.399 + i * 0.7, r = 0.1 + t * (current.lines.length ? 1.65 : 1.1), s = (1 - t) * 0.065 + 0.015;
          place(sparkles, particleCount++, position, [s, s * 1.7, s], cell, null, [Math.cos(angle) * r, Math.sin(angle) * r, Math.sin(angle * 0.7) * r]);
        }
      } else fallback.push({ x: position[0], y: position[1], z: position[2], sx: 0.75 * scale, sy: 0.75 * scale, sz: 0.75 * scale, color: GEM_COLORS[value], data: { cell } });
    }
    if (gems.length) {
      gems.forEach((m, i) => m.count = counts[i]);
      ears.forEach((m, i) => m.count = earCounts[i]);
      grid.count = gridCount;
      eyes.count = pupils.count = faceCount * 2;
      muzzles.count = noses.count = faceCount;
      sparkles.count = particleCount;
      sparkles.material.opacity = current?.type === "clear" ? 1 - t : 0;
      selection.count = selectionCount;
      hints.count = hintCount;
      ribbons.count = 0;
      if (current?.type === "clear") for (const line2 of current.lines) {
        const first = matchCoord(line2[0], state.dims), last = matchCoord(line2.at(-1), state.dims), a = world(first), b = world(last), axis = first.findIndex((v, i) => v !== last[i]), scale = [0.1, 0.1, 0.1];
        if (axis < 0) continue;
        scale[axis] = Math.abs(b[axis] - a[axis]) + SPACING;
        place(ribbons, ribbons.count++, a.map((n, i) => (n + b[i]) / 2), scale, matchCoord(line2[Math.floor(line2.length / 2)], state.dims));
      }
      ribbons.material.opacity = Math.sin(t * Math.PI) * 0.68;
      for (const m of meshes) {
        m.instanceMatrix.needsUpdate = true;
        const facing = m.geometry.getAttribute("m3Facing");
        if (facing) facing.needsUpdate = true;
        (m.userData.pickCells ?? m.userData.sliceCells).length = m.count;
        m.boundingBox = null;
        m.boundingSphere = null;
      }
    }
    if (!gems.length) ctx.setVoxels(fallback);
    renderHud();
  }
  function reset() {
    ctx.spatial?.cancelAssist?.();
    assist.reset();
    automaticHint = false;
    currentSlice = { mode: null };
    state = createMatchState(spatial, Math.random, spatial ? dimensions : void 0);
    boardRevision++;
    selected = null;
    hintCells = [];
    frames = [];
    pending = null;
    elapsed = 0;
    clock = 0;
    announced = false;
    noticeLife = 0;
    lastHud = "";
    lastSoundFrame = null;
    cameraPreset = spatial ? "volume" : "classic";
    mode.value = spatial ? "3d" : "2d";
    ctx.setVoxels([]);
    ctx.setLabels([]);
    render();
    initCamera();
    if (!cachedMoves().length) ctx.message("Make one axis longer to create matches.");
  }
  function finish() {
    if (state.over && !announced) {
      announced = true;
      ctx.message(state.won ? "Star target reached!" : state.endReason === "time" ? "Time up." : "Out of moves.");
      ctx.sound?.(state.won ? "win" : "error");
    }
    if (!pending) return;
    const result = pending;
    pending = null;
    if (!result.valid) ctx.message("Try another pair.");
    render();
  }
  function perform(a, b) {
    if (frames.length || state.over) return;
    const result = playMatchSwap(state, a, b);
    if (result.valid) boardRevision++;
    selected = null;
    hintCells = [];
    automaticHint = false;
    assist.interrupt();
    if (result.reason === "adjacent") {
      ctx.message("Choose a neighbour.");
      render();
      return;
    }
    frames = result.frames;
    pending = result;
    elapsed = 0;
    ctx.sound?.(result.valid ? "move" : "error");
    render();
    if (!frames.length) finish();
  }
  function pick(cell) {
    if (frames.length || state.over || !inBounds(cell, state.dims)) return;
    if (!selected || !areAdjacent(selected, cell)) {
      selected = sameCell(selected, cell) ? null : [...cell];
      hintCells = [];
      render();
      return;
    }
    perform([...selected], cell);
  }
  function directionAction(key2) {
    if (frames.length || state.over) return;
    if (!selected) {
      ctx.message("Pick an animal.");
      return;
    }
    const vector = spatial ? ctx.spatial?.vectorForKey?.(key2) ?? matchDirection(key2, "xy") : matchDirection(key2, "xz");
    if (vector) {
      const next = selected.map((n, a) => n + vector[a]);
      if (inBounds(next, state.dims)) perform([...selected], next);
    }
  }
  function power(name) {
    if (frames.length || state.over) return;
    if (name !== "time" && !selected) {
      ctx.message("Pick an animal first.");
      return;
    }
    const vector = ctx.spatial?.vectorForKey?.("ArrowRight") ?? [1, 0, 0], axis = vector.findIndex((n) => n !== 0), result = useMatchPower(state, name, selected ?? [0, 0, 0], axis);
    if (!result.valid) return;
    if (name !== "time") boardRevision++;
    frames = result.frames;
    pending = result;
    elapsed = 0;
    selected = null;
    hintCells = [];
    automaticHint = false;
    assist.interrupt();
    showNotice(name === "time" ? "+10 SECONDS!" : name === "row" ? "LINE PARTY!" : "BOOM!");
    ctx.sound?.(name === "time" ? "power" : name === "row" ? "line" : "burst");
    render();
    if (!frames.length) finish();
  }
  function inCurrentSlice(cell) {
    if (!currentSlice.mode) return true;
    const axes4 = ["x", "y", "z"];
    if (currentSlice.mode === "layer") return cell[axes4.indexOf(currentSlice.axis)] === currentSlice.index;
    return axes4.every((a, i) => Math.abs(cell[i] - currentSlice.center?.[a]) <= (currentSlice.mode === "cell" ? 0 : 1));
  }
  function hint() {
    if (frames.length || state.over) return;
    automaticHint = false;
    const move = currentSlice.mode ? cachedMoves().find((pair) => pair.every(inCurrentSlice)) : cachedMoves()[0];
    if (!move) {
      hintCells = [];
      selected = null;
      if (currentSlice.mode) ctx.message("X \u2192 next layer");
      else {
        reshuffleMatchBoard(state.board, state.dims);
        state.reshuffles++;
        boardRevision++;
      }
      render();
      return;
    }
    hintCells = move.map((p) => [...p]);
    selected = [...move[0]];
    ctx.message("Swap the glowing pair.");
    render();
  }
  function onUserAction(event = {}) {
    const clear = automaticHint;
    assist.interrupt(event);
    ctx.spatial?.cancelAssist?.();
    if (clear) {
      hintCells = [];
      automaticHint = false;
      render();
    }
  }
  function onGlobalView() {
    onUserAction({ type: "control" });
    assist.globalView();
  }
  function onSlice(snapshot) {
    const changed = currentSlice.mode !== snapshot?.mode || currentSlice.axis !== snapshot?.axis || currentSlice.index !== snapshot?.index;
    currentSlice = { ...snapshot, center: snapshot?.center && { ...snapshot.center } };
    if (changed && !applyingAssist) {
      onUserAction({ type: "control" });
      if (snapshot?.mode) assist.manualSlice();
    }
    if (hintCells.length && !hintCells.every(inCurrentSlice)) {
      hintCells = [];
      automaticHint = false;
      render();
    }
  }
  function updateAssist(dt) {
    const blocked = !!selected || frames.length > 0 || state.over;
    if (blocked && (assist.active || assist.pending)) {
      ctx.spatial?.cancelAssist?.();
      if (automaticHint) {
        hintCells = [];
        automaticHint = false;
      }
    }
    const action = assist.advance(dt, blocked ? { blocked: true } : { moves: cachedMoves(), dims: state.dims, slice: currentSlice, basis: ctx.spatial?.basis?.(), spatial });
    if (!action) return;
    if (action.type === "pulse") {
      hintCells = action.pair.map((p) => [...p]);
      automaticHint = true;
      assist.applied(action);
      return;
    }
    let accepted = false;
    applyingAssist = true;
    try {
      const options = { axis: action.axis, sign: action.sign, duration: 850 };
      accepted = action.type === "slice" ? ctx.spatial?.assistSlice?.({ ...options, index: action.index }) === true : ctx.spatial?.assistFace?.(options) === true;
    } finally {
      applyingAssist = false;
    }
    assist.applied(action, accepted, 0.95);
  }
  reset();
  return { reset, getDimensions() {
    return { x: state.dims[0], y: state.dims[1], z: state.dims[2] };
  }, setDimensions(d) {
    const next = [d.x, d.y, d.z];
    if (next.some((n) => !Number.isSafeInteger(n) || n < 1) || next.reduce((a, b) => a * b, 1) > CAPACITY) throw new RangeError("XYZ must be positive integers, up to 4,096 cells.");
    dimensions = next;
    spatial = true;
    reset();
  }, getSelection() {
    const p = selected ?? state.dims.map((n) => Math.floor((n - 1) / 2));
    return { x: p[0], y: p[1], z: p[2] };
  }, cellPosition(data) {
    return data?.cell ? { x: data.cell[0], y: data.cell[1], z: data.cell[2] } : null;
  }, selectCell(data) {
    onUserAction({ type: "control" });
    if (data?.cell && inBounds(data.cell, state.dims)) {
      selected = [...data.cell];
      hintCells = [];
      render();
    }
  }, onSlice, onUserAction, onGlobalView, onView(view) {
    cameraPreset = view;
  }, update(dt) {
    clock += dt;
    noticeLife = Math.max(0, noticeLife - dt);
    const over = tickMatchState(state, dt);
    if (frames.length) {
      elapsed += dt;
      while (frames.length && elapsed >= frames[0].duration) {
        elapsed -= frames[0].duration;
        frames.shift();
      }
      if (frames[0]?.type === "clear" && lastSoundFrame !== frames[0]) {
        lastSoundFrame = frames[0];
        const f = frames[0], big = f.blasts.length > 0, line2 = f.lines.length > 0;
        showNotice(big ? "SUPER NOVA!" : line2 ? "LINE PARTY!" : f.combo > 2 ? `WILD! \xD7${f.multiplier}` : f.combo > 1 ? `SWEET! \xD7${f.multiplier}` : `+${f.points}`);
        ctx.sound?.(big ? "burst" : line2 ? "line" : f.combo > 1 ? "combo" : "clear");
      }
      if (!frames.length) finish();
    } else if (over) finish();
    updateAssist(dt);
    renderClock += dt;
    if (frames.length || renderClock >= 1 / 30) {
      renderClock = 0;
      render();
    }
  }, onPick(data) {
    onUserAction({ type: "control" });
    if (data?.cell) pick(data.cell);
  }, onKey(key2, event) {
    onUserAction({ type: "key", key: key2 });
    if (matchDirection(key2, "xy")) {
      event?.preventDefault();
      directionAction(key2);
    } else if (key2 === "h") hint();
    else if (["1", "2", "3"].includes(key2)) power({ 1: "row", 2: "burst", 3: "time" }[key2]);
    else if (key2 === "Escape") {
      selected = null;
      hintCells = [];
      render();
    }
  }, getState() {
    return { ...state, board: [...state.board], selected, plane: spatial ? "volume" : "xz", viewMode: spatial ? "volume" : "classic", cameraPreset, animating: frames.length > 0, hintCells: hintCells.map((p) => [...p]), assist: { ...assist.snapshot(), automaticHint, moveCacheComputations: moveCache.computations }, presentation: "floating-animal-lattice", activeEffect: frames[0]?.type ?? null };
  }, dispose() {
    disposed = true;
    ctx.spatial?.cancelAssist?.();
    assist.reset();
    for (const mesh of meshes) {
      ctx.group?.remove(mesh);
      mesh.dispose?.();
    }
    for (const resource of resources) resource.dispose();
    hud?.remove();
    ctx.ui.replaceChildren();
  } };
}

// ../Cubiverse/src/games/tictactoe.js
var TICTACTOE_COLORS = Object.freeze({ 1: "#468cff", 2: "#ff4b4b" });
var dimensionsOf = (value) => Array.isArray(value) ? value : value ? [3, 3, 3] : [3, 3, 1];
var validateDimensions2 = (value) => {
  const d = Array.isArray(value) ? [...value] : [value?.x, value?.y, value?.z];
  if (d.length !== 3 || d.some((n) => !Number.isSafeInteger(n) || n < 1) || d.reduce((a, b) => a * b, 1) > 4096) throw new RangeError("XYZ must be positive integers, up to 4,096 cells.");
  return d;
};
var tttIndex = ([x, y, z = 0], dimensions = [3, 3, 3]) => x + dimensions[0] * (y + dimensions[1] * z);
var tttCoordinate = (index, dimensions = [3, 3, 3]) => [index % dimensions[0], Math.floor(index / dimensions[0]) % dimensions[1], Math.floor(index / (dimensions[0] * dimensions[1]))];
var lineCache = /* @__PURE__ */ new Map();
function ticTacToeLines(spatial = true) {
  const dimensions = dimensionsOf(spatial), key2 = dimensions.join(",");
  if (lineCache.has(key2)) return lineCache.get(key2);
  const lines = [];
  for (let dx = -1; dx <= 1; dx++) for (let dy = -1; dy <= 1; dy++) for (let dz = -1; dz <= 1; dz++) {
    const direction = [dx, dy, dz];
    if (direction.find((value) => value !== 0) !== 1) continue;
    for (let x = 0; x < dimensions[0]; x++) for (let y = 0; y < dimensions[1]; y++) for (let z = 0; z < dimensions[2]; z++) {
      const center = [x, y, z], points = [-1, 0, 1].map((step) => center.map((value, axis) => value + step * direction[axis]));
      if (points.every((p) => p.every((value, axis) => value >= 0 && value < dimensions[axis]))) lines.push(Object.freeze(points.map((p) => tttIndex(p, dimensions))));
    }
  }
  const frozen = Object.freeze(lines);
  lineCache.set(key2, frozen);
  return frozen;
}
function evaluateTicTacToe(board, spatial = true) {
  const dims = dimensionsOf(spatial);
  if (board.length !== dims.reduce((a, b) => a * b, 1) || [...board].some((value) => ![0, 1, 2].includes(value))) throw new RangeError("Invalid Tic-Tac-Toe board.");
  const lines = ticTacToeLines(dims).filter((line2) => board[line2[0]] !== 0 && line2.every((index) => board[index] === board[line2[0]]));
  if (lines.length) {
    const winner = board[lines[0][0]];
    return { status: "won", winner, lines: lines.filter((line2) => board[line2[0]] === winner).map((line2) => [...line2]) };
  }
  return { status: board.every((value) => value !== 0) ? "draw" : "playing", winner: 0, lines: [] };
}
var TicTacToeGame = class {
  constructor({ spatial = true, dimensions = null } = {}) {
    this.spatial = spatial;
    this.dimensions = validateDimensions2(dimensions ?? dimensionsOf(spatial));
    this.restart();
  }
  restart() {
    this.board = new Int8Array(this.dimensions.reduce((a, b) => a * b, 1));
    this.player = 1;
    this.status = "playing";
    this.winner = 0;
    this.winningLines = [];
    this.history = [];
  }
  play(index, player = this.player) {
    if (this.status !== "playing" || player !== this.player || !Number.isInteger(index) || index < 0 || index >= this.board.length || this.board[index] !== 0) return false;
    this.board[index] = player;
    this.history.push({ index, player });
    this.applyResult();
    if (this.status === "playing") this.player = 3 - player;
    return true;
  }
  applyResult() {
    const result = evaluateTicTacToe(this.board, this.dimensions);
    this.status = result.status;
    this.winner = result.winner;
    this.winningLines = result.lines;
  }
  undo(count = 1) {
    if (!Number.isInteger(count) || count < 1 || !this.history.length) return false;
    for (let n = 0; n < count && this.history.length; n++) {
      const move = this.history.pop();
      this.board[move.index] = 0;
      this.player = move.player;
    }
    this.applyResult();
    return true;
  }
  legalMoves() {
    return this.status === "playing" ? [...this.board.keys()].filter((index) => this.board[index] === 0) : [];
  }
  getState() {
    return { spatial: this.spatial, dimensions: [...this.dimensions], board: [...this.board], player: this.player, currentPlayer: this.player, status: this.status, winner: this.winner, winningLines: this.winningLines.map((line2) => [...line2]), history: this.history.map((move) => ({ ...move })), moves: this.history.length };
  }
};
var aiModelCache = /* @__PURE__ */ new Map();
function aiModel(dims) {
  const key2 = dims.join(",");
  if (aiModelCache.has(key2)) return aiModelCache.get(key2);
  const lines = ticTacToeLines(dims), size = dims.reduce((a, b) => a * b, 1), through = Array.from({ length: size }, () => []);
  lines.forEach((line2, n) => line2.forEach((index) => through[index].push(n)));
  const priority = Array.from({ length: size }, (_, index) => {
    const p = tttCoordinate(index, dims);
    return through[index].length * 0.1 - p.reduce((sum, v, axis) => sum + Math.abs(v - (dims[axis] - 1) / 2), 0) * 0.01;
  });
  const model = { lines, through, priority };
  aiModelCache.set(key2, model);
  return model;
}
function chooseTicTacToeMove(board, player = 2, spatial = true) {
  const dims = dimensionsOf(spatial);
  if (![1, 2].includes(player) || evaluateTicTacToe(board, dims).status !== "playing") return -1;
  const cells = Int8Array.from(board), { lines, through, priority } = aiModel(dims), counts = [null, new Uint8Array(lines.length), new Uint8Array(lines.length)];
  let empty = 0, nodes = 0;
  for (let index = 0; index < cells.length; index++) {
    if (!cells[index]) {
      empty++;
      continue;
    }
    for (const line2 of through[index]) counts[cells[index]][line2]++;
  }
  const MATE = 1e5, weights = [0, 3, 28], budget = cells.length <= 64 ? 6500 : cells.length <= 216 ? 1800 : cells.length <= 512 ? 400 : 90;
  function threats(owner) {
    const result = /* @__PURE__ */ new Set();
    for (let n = 0; n < lines.length; n++) if (counts[owner][n] === 2 && !counts[3 - owner][n]) {
      for (const index of lines[n]) if (!cells[index]) result.add(index);
    }
    return [...result];
  }
  function put(index, owner) {
    cells[index] = owner;
    empty--;
    for (const n of through[index]) counts[owner][n]++;
  }
  function take(index, owner) {
    cells[index] = 0;
    empty++;
    for (const n of through[index]) counts[owner][n]--;
  }
  function won(index, owner) {
    return through[index].some((n) => counts[owner][n] === 3);
  }
  function value(owner) {
    let score = 0;
    for (let n = 0; n < lines.length; n++) {
      const own = counts[owner][n], other = counts[3 - owner][n];
      if (!other) score += weights[own] ?? MATE;
      if (!own) score -= weights[other] ?? MATE;
    }
    return score;
  }
  function ranked(owner, limit) {
    const scores = new Float64Array(cells.length);
    for (let n = 0; n < lines.length; n++) {
      const own = counts[owner][n], other = counts[3 - owner][n];
      if (own && other) continue;
      const weight = own === 2 ? 500 : other === 2 ? 450 : own === 1 ? 14 : other === 1 ? 11 : 1;
      for (const index of lines[n]) if (!cells[index]) scores[index] += weight;
    }
    const moves = [];
    for (let index = 0; index < cells.length; index++) if (!cells[index]) moves.push(index);
    return moves.sort((a, b) => scores[b] - scores[a] || priority[b] - priority[a] || a - b).slice(0, limit);
  }
  function search(owner, depth2, alpha, beta, ply) {
    nodes++;
    if (!empty) return 0;
    const wins2 = threats(owner);
    if (wins2.length) return MATE - ply;
    const danger2 = threats(3 - owner);
    if (danger2.length > 1) return -MATE + ply + 1;
    if (nodes >= budget || ply >= 12 || depth2 <= 0 && !danger2.length) return value(owner);
    const moves = danger2.length ? danger2 : ranked(owner, cells.length <= 9 ? 9 : 6);
    let best2 = -Infinity;
    for (const index of moves) {
      put(index, owner);
      const score = won(index, owner) ? MATE - ply : -search(3 - owner, depth2 - 1, -beta, -alpha, ply + 1);
      take(index, owner);
      best2 = Math.max(best2, score);
      alpha = Math.max(alpha, score);
      if (alpha >= beta || nodes >= budget) break;
    }
    return best2;
  }
  const wins = threats(player);
  if (wins.length) return wins[0];
  const danger = threats(3 - player);
  if (danger.length === 1) return danger[0];
  const center = tttIndex(dims.map((n) => Math.floor(n / 2)), dims);
  if (!danger.length && !cells[center]) return center;
  if (!danger.length) for (const index of ranked(player, cells.length)) {
    const targets = /* @__PURE__ */ new Set();
    for (const n of through[index]) if (counts[player][n] === 1 && !counts[3 - player][n]) {
      for (const other of lines[n]) if (other !== index && !cells[other]) targets.add(other);
    }
    if (targets.size > 1) return index;
  }
  const candidates = danger.length ? danger : ranked(player, cells.length <= 9 ? 9 : 12), depth = cells.length <= 9 ? empty : cells.length <= 64 ? 5 : cells.length <= 216 ? 4 : 2;
  let best = candidates[0] ?? -1;
  for (let horizon = 1; horizon <= depth && nodes < budget; horizon++) {
    const ordered = [best, ...candidates.filter((index) => index !== best)];
    let next = best, bestScore = -Infinity, alpha = -Infinity, complete = true;
    for (const index of ordered) {
      put(index, player);
      const score = won(index, player) ? MATE : -search(3 - player, horizon - 1, -Infinity, -alpha, 1);
      take(index, player);
      if (nodes >= budget) {
        complete = false;
        break;
      }
      if (score > bestScore) {
        next = index;
        bestScore = score;
      }
      alpha = Math.max(alpha, score);
      if (bestScore >= MATE - 3) break;
    }
    if (complete) best = next;
    if (bestScore >= MATE - 3) break;
  }
  return best;
}
function createGame7(ctx) {
  const THREE4 = ctx.THREE, doc = ctx.ui.ownerDocument;
  let spatial = true, dimensions = [3, 3, 3], solo = true, game, cursor = 13, hovered = -1, aiTimer = 0, disposed = false;
  const owned = /* @__PURE__ */ new Set(), retained = [], markMeshes = [], dummy = THREE4 ? new THREE4.Object3D() : null, up = THREE4 ? new THREE4.Vector3(0, 1, 0) : null;
  let xMesh, oMesh, winMesh, cage, cursorFrame, hoverFrame;
  const own = (resource) => (owned.add(resource), resource);
  function lineBox(size, color, name) {
    const box = new THREE4.BoxGeometry(...size), geometry = own(new THREE4.EdgesGeometry(box));
    box.dispose();
    const line2 = new THREE4.LineSegments(geometry, own(new THREE4.LineBasicMaterial({ color, transparent: true, opacity: 0.7 })));
    line2.name = name;
    ctx.group.add(line2);
    retained.push(line2);
    return line2;
  }
  function instanced(geometry, material, count, name) {
    const mesh = new THREE4.InstancedMesh(geometry, material, count);
    mesh.count = 0;
    mesh.frustumCulled = false;
    mesh.name = name;
    mesh.instanceMatrix.setUsage(THREE4.DynamicDrawUsage);
    ctx.group.add(mesh);
    retained.push(mesh);
    markMeshes.push(mesh);
    return mesh;
  }
  if (THREE4 && ctx.group) {
    xMesh = instanced(own(new THREE4.CapsuleGeometry(0.064, 0.62, 3, 8)), own(new THREE4.MeshStandardMaterial({ color: TICTACTOE_COLORS[1], roughness: 0.3, emissive: TICTACTOE_COLORS[1], emissiveIntensity: 0.15 })), 8192, "tictactoe-solid-x");
    oMesh = instanced(own(new THREE4.TorusGeometry(0.28, 0.071, 8, 24)), own(new THREE4.MeshStandardMaterial({ color: TICTACTOE_COLORS[2], roughness: 0.3, emissive: TICTACTOE_COLORS[2], emissiveIntensity: 0.12 })), 4096, "tictactoe-solid-o");
    winMesh = instanced(own(new THREE4.CylinderGeometry(0.025, 0.025, 1, 8)), own(new THREE4.MeshBasicMaterial({ color: "#ffe081" })), 53248, "tictactoe-winning-lines");
    cage = instanced(own(new THREE4.CylinderGeometry(0.065, 0.065, 1, 10)), own(new THREE4.MeshStandardMaterial({ color: "#f4c94c", roughness: 0.32, metalness: 0.03 })), 12, "tictactoe-full-cube");
    cursorFrame = lineBox([1.09, 1.09, 1.09], "#ffd573", "tictactoe-cursor");
    hoverFrame = lineBox([1.04, 1.04, 1.04], "#adf2e6", "tictactoe-hover");
  }
  function button(text2, action, className = "small-button") {
    const b = doc.createElement("button");
    b.textContent = text2;
    b.className = className;
    b.onclick = action;
    return b;
  }
  function row(...children) {
    const r = doc.createElement("div");
    r.className = "control-row";
    r.append(...children);
    ctx.ui.append(r);
    return r;
  }
  function select(options, action, label) {
    const s = doc.createElement("select");
    s.setAttribute("aria-label", label);
    for (const [value, text2] of options) {
      const option = doc.createElement("option");
      option.value = value;
      option.textContent = text2;
      s.append(option);
    }
    s.onchange = () => action(s.value);
    return s;
  }
  const modeSelect = select([["3d", "3D"], ["2d", "2D"]], (value) => {
    spatial = value === "3d";
    reset();
  }, "Tic-Tac-Toe mode");
  const opponentSelect = select([["ai", "1P \xB7 AI"], ["local", "2P"]], (value) => {
    solo = value === "ai";
    restart(false);
  }, "Tic-Tac-Toe opponent");
  row(modeSelect, opponentSelect);
  const confirm = button("Place \xB7 Enter", () => place(cursor), "primary-button"), undoButton = button("Undo \xB7 U", undo);
  row(confirm, undoButton, button("Restart", () => restart(false)));
  row(button("\u2190", () => moveCursor("ArrowLeft")), button("\u2191", () => moveCursor("ArrowUp")), button("\u2193", () => moveCursor("ArrowDown")), button("\u2192", () => moveCursor("ArrowRight")));
  const turnRow = row(button("W", () => ctx.spatial?.turn?.("up")), button("S", () => ctx.spatial?.turn?.("down")), button("A", () => ctx.spatial?.turn?.("left")), button("D", () => ctx.spatial?.turn?.("right")));
  const positionEl = doc.createElement("p");
  positionEl.className = "hint";
  positionEl.hidden = true;
  ctx.ui.append(positionEl);
  const help = doc.createElement("p");
  help.className = "hint";
  help.hidden = true;
  ctx.ui.append(help);
  const touchTitle = doc.createElement("p");
  touchTitle.className = "hint";
  touchTitle.textContent = "X \u2192 centre \xB7 Enter \u2192 place";
  touchTitle.hidden = true;
  ctx.ui.append(touchTitle);
  const touchBoard = doc.createElement("div");
  touchBoard.className = "control-group";
  touchBoard.setAttribute("aria-label", "Tic-Tac-Toe cells");
  touchBoard.hidden = true;
  ctx.ui.append(touchBoard);
  const world = (index) => tttCoordinate(index, game.dimensions).map((value, axis) => (value - (game.dimensions[axis] - 1) / 2) * 1.2);
  const hud = doc.createElement("div");
  hud.className = "game-hud-score tictactoe-hud";
  hud.setAttribute("aria-live", "polite");
  ctx.hud?.append(hud);
  const humanTurn = () => game.status === "playing" && (!solo || game.player === 1);
  function initCamera() {
    if (spatial) {
      if (ctx.spatial?.volume) ctx.spatial.volume({ target: [0, 0, 0], distance: Math.max(...game.dimensions) * 3.5, size: game.dimensions.map((n) => Number((n * 1.2).toFixed(6))) });
      else ctx.frame({ target: [0, 0, 0], distance: 10.5 });
    } else ctx.frame({ target: [0, 0, 0], distance: 10, position: [0, 0, 10] });
  }
  function matrix(mesh, index, position, quaternion = null, scale = [1, 1, 1]) {
    dummy.position.set(...position);
    dummy.quaternion.identity();
    if (quaternion) dummy.quaternion.copy(quaternion);
    dummy.scale.set(...scale);
    dummy.updateMatrix();
    mesh.setMatrixAt(index, dummy.matrix);
  }
  function refreshHover() {
    if (hoverFrame) {
      hoverFrame.visible = hovered >= 0 && humanTurn() && game.board[hovered] === 0 && hovered !== cursor;
      if (hoverFrame.visible) hoverFrame.position.set(...world(hovered));
    }
  }
  function render() {
    if (disposed) return;
    const voxels2 = [], labels2 = [], winning = new Set(game.winningLines.flat());
    let xs = 0, os = 0;
    const xPicks = [], oPicks = [];
    if (!spatial) voxels2.push({ x: 0, y: 0, z: -0.13, sx: 3.6, sy: 3.6, sz: 0.14, color: "#a2b5c6" });
    for (let index = 0; index < game.board.length; index++) {
      const value = game.board[index], [x, y, z] = world(index), isCursor = index === cursor;
      voxels2.push({ x, y, z, sx: 0.98, sy: 0.98, sz: spatial ? 0.98 : 0.12, color: value ? TICTACTOE_COLORS[value] : spatial ? "#86aacd" : "#f1f5f8", opacity: spatial ? winning.has(index) ? 0.3 : value ? 0.2 : isCursor ? 0.17 : 0.08 : 1, data: { index } });
      if (value && xMesh) {
        const position = [x, y, z + (spatial ? 0 : 0.16)];
        if (value === 1) for (const angle of [-Math.PI / 4, Math.PI / 4]) {
          const quaternion = new THREE4.Quaternion().setFromAxisAngle(new THREE4.Vector3(0, 0, 1), angle);
          matrix(xMesh, xs++, position, quaternion);
          xPicks.push({ index });
        }
        else {
          matrix(oMesh, os++, position);
          oPicks.push({ index });
        }
      } else if (value) labels2.push({ x, y, z, cube: spatial, text: value === 1 ? "X" : "O", sx: 1, sy: 1, sz: 1, color: TICTACTOE_COLORS[value], size: 0.55, data: { index } });
    }
    if (xMesh) {
      xMesh.count = xs;
      oMesh.count = os;
      xMesh.userData.pickCells = xPicks;
      oMesh.userData.pickCells = oPicks;
      winMesh.count = game.winningLines.length;
      game.winningLines.forEach((line2, index) => {
        const start = new THREE4.Vector3(...world(line2[0])), end = new THREE4.Vector3(...world(line2[2])), delta = end.clone().sub(start), center = start.clone().add(end).multiplyScalar(0.5);
        if (!spatial) center.z = 0.17;
        const quaternion = new THREE4.Quaternion().setFromUnitVectors(up, delta.clone().normalize());
        matrix(winMesh, index, center.toArray(), quaternion, [1, delta.length() + 0.35, 1]);
      });
      for (const mesh of markMeshes) {
        mesh.instanceMatrix.needsUpdate = true;
        mesh.boundingBox = null;
        mesh.boundingSphere = null;
      }
      cage.visible = spatial;
      cage.count = 12;
      let rail = 0;
      for (let axis = 0; axis < 3; axis++) for (const a of [-1, 1]) for (const b of [-1, 1]) {
        const position = [0, 0, 0], direction = [0, 0, 0];
        direction[axis] = 1;
        position[(axis + 1) % 3] = a * game.dimensions[(axis + 1) % 3] * 0.6;
        position[(axis + 2) % 3] = b * game.dimensions[(axis + 2) % 3] * 0.6;
        const rotation = new THREE4.Quaternion().setFromUnitVectors(up, new THREE4.Vector3(...direction));
        matrix(cage, rail++, position, rotation, [1, game.dimensions[axis] * 1.2 + 0.07, 1]);
      }
      cage.instanceMatrix.needsUpdate = true;
      cursorFrame.visible = false;
      cursorFrame.position.set(...world(cursor));
      cursorFrame.scale.set(1, 1, spatial ? 1 : 0.16);
      refreshHover();
    }
    ctx.setVoxels(voxels2);
    ctx.setLabels(labels2);
    ctx.setStats({ "Turn": game.status === "playing" ? `${game.player === 1 ? "X" : "O"}${solo && game.player === 2 ? " \xB7 AI" : ""}` : game.status === "draw" ? "Draw" : `${game.winner === 1 ? "X" : "O"} wins`, "Size": game.dimensions.join(" \xD7 "), "Winning lines": ticTacToeLines(game.dimensions).length, "Moves": game.history.length, "Mode": solo ? "1P \xB7 AI" : "2P" });
    const p = tttCoordinate(cursor, game.dimensions);
    positionEl.textContent = `Cell: X${p[0] + 1} Y${p[1] + 1}${spatial ? ` Z${p[2] + 1}` : ""} \xB7 ${game.board[cursor] ? game.board[cursor] === 1 ? "X" : "O" : "Empty"}`;
    hud.textContent = game.status === "won" ? `${game.winner === 1 ? "\u2715" : "\u25CB"}  WIN` : game.status === "draw" ? "DRAW" : `${game.player === 1 ? "\u2715" : "\u25CB"}  \xB7  ${game.history.length}`;
    hud.style.color = TICTACTOE_COLORS[game.player];
    confirm.disabled = !humanTurn() || game.board[cursor] !== 0;
    undoButton.disabled = game.history.length === 0;
    touchBoard.replaceChildren();
    for (let z = 0; game.board.length <= 216 && z < game.dimensions[2]; z++) {
      const caption2 = doc.createElement("p");
      caption2.className = "hint";
      caption2.textContent = spatial ? `Z ${z + 1} \xB7 ${z === 1 ? "centre" : "all cells"}` : "all cells";
      touchBoard.append(caption2);
      const grid = doc.createElement("div");
      grid.className = "piece-grid";
      grid.style.gridTemplateColumns = `repeat(${game.dimensions[0]},1fr)`;
      grid.style.maxHeight = "none";
      for (let y = game.dimensions[1] - 1; y >= 0; y--) for (let x = 0; x < game.dimensions[0]; x++) {
        const index = tttIndex([x, y, z], game.dimensions), value = game.board[index], b = button(value === 1 ? "X" : value === 2 ? "O" : "\xB7", () => {
          cursor = index;
          render();
        });
        b.classList.add?.(index === cursor ? "selected" : "cell");
        b.setAttribute("data-cell", String(index));
        b.setAttribute("aria-label", `X${x + 1} Y${y + 1} Z${z + 1}, ${value === 1 ? "X" : value === 2 ? "O" : "Empty"}`);
        if (value) b.style.color = TICTACTOE_COLORS[value];
        grid.append(b);
      }
      touchBoard.append(grid);
    }
  }
  function message() {
    if (game.status === "won") ctx.message(`${game.winner === 1 ? "X" : "O"} wins \u2713`);
    else if (game.status === "draw") ctx.message("Draw \xB7 U \u2192 undo");
    else ctx.message(solo && game.player === 2 ? "AI\u2026" : `Turn ${game.player === 1 ? "X" : "O"} \xB7 Enter \u2192 place`);
  }
  function place(index) {
    if (!Number.isInteger(index) || index < 0 || index >= game.board.length) return;
    if (!humanTurn()) {
      ctx.message(game.status === "playing" ? "AI is thinking." : "Round over. Undo or restart.");
      return;
    }
    cursor = index;
    if (!game.play(index)) {
      ctx.message("Choose an empty cell.");
      render();
      return;
    }
    aiTimer = solo && game.player === 2 && game.status === "playing" ? 0.4 : 0;
    ctx.sound?.(game.status === "won" ? "win" : "move");
    render();
    message();
  }
  function moveCursor(key2) {
    const fallback = { arrowleft: [-1, 0, 0], arrowright: [1, 0, 0], arrowup: [0, 1, 0], arrowdown: [0, -1, 0] }, vector = spatial ? ctx.spatial?.vectorForKey?.(key2) ?? fallback[key2.toLowerCase()] : fallback[key2.toLowerCase()];
    if (!vector) return;
    const p = tttCoordinate(cursor, game.dimensions).map((value, axis) => Math.max(0, Math.min(game.dimensions[axis] - 1, value + vector[axis])));
    cursor = tttIndex(p, game.dimensions);
    render();
  }
  function undo() {
    aiTimer = 0;
    const last = game.history.at(-1), amount = solo && last?.player === 2 ? 2 : 1;
    if (game.undo(amount)) {
      cursor = last.index;
      ctx.sound?.("move");
      render();
      message();
    }
  }
  function restart(resetView = true) {
    game = new TicTacToeGame({ spatial, dimensions: spatial ? dimensions : [3, 3, 1] });
    cursor = tttIndex(game.dimensions.map((n) => Math.floor(n / 2)), game.dimensions);
    hovered = -1;
    aiTimer = 0;
    modeSelect.value = spatial ? "3d" : "2d";
    opponentSelect.value = solo ? "ai" : "local";
    turnRow.hidden = !spatial;
    help.textContent = spatial ? "Right drag \u2192 orbit \xB7 X \u2192 centre \xB7 Z \u2192 all \xB7 Enter \u2192 place" : "Click \u2192 place \xB7 U \u2192 undo";
    render();
    message();
    if (resetView) initCamera();
  }
  function reset() {
    restart(true);
  }
  ctx.setRules?.("<p>Line up three on any axis or diagonal. X reveals the centre; Z restores all cells. XYZ is customisable.</p><p>Click to place. Arrows select, Enter confirms, U undoes. Play against AI or a friend.</p>");
  reset();
  return { reset, getDimensions() {
    const [x, y, z] = game.dimensions;
    return { x, y, z };
  }, setDimensions(value) {
    dimensions = validateDimensions2(value);
    spatial = true;
    reset();
  }, getSelection() {
    const [x, y, z] = tttCoordinate(cursor, game.dimensions);
    return { x, y, z };
  }, selectCell(data) {
    if (Number.isInteger(data?.index) && data.index >= 0 && data.index < game.board.length) {
      cursor = data.index;
      render();
    }
  }, cellPosition(data) {
    return Number.isInteger(data?.index) && data.index >= 0 && data.index < game.board.length ? tttCoordinate(data.index, game.dimensions) : null;
  }, render, onView() {
  }, update(dt) {
    if (aiTimer > 0) {
      aiTimer = Math.max(0, aiTimer - dt);
      if (aiTimer === 0 && solo && game.player === 2 && game.status === "playing") {
        const index = chooseTicTacToeMove(game.board, 2, game.dimensions);
        if (index >= 0 && game.play(index)) {
          ctx.sound?.(game.status === "won" ? "error" : "move");
          render();
          message();
        }
      }
    }
  }, onKey(key2, event) {
    const lower = key2.toLowerCase();
    if (["arrowleft", "arrowright", "arrowup", "arrowdown"].includes(lower)) {
      event?.preventDefault();
      moveCursor(key2);
    } else if (lower === "enter") {
      event?.preventDefault();
      place(cursor);
    } else if (lower === "u") undo();
  }, onPick(data) {
    if (Number.isInteger(data?.index)) place(data.index);
  }, onHover(data) {
    const next = Number.isInteger(data?.index) && data.index >= 0 && data.index < game.board.length ? data.index : -1;
    if (next !== hovered) {
      hovered = next;
      refreshHover();
    }
  }, getState() {
    return { ...game.getState(), opponent: solo ? "ai" : "local", cursor, cursorCoordinates: tttCoordinate(cursor, game.dimensions), aiThinking: aiTimer > 0, viewMode: spatial ? "volume" : "classic" };
  }, dispose() {
    disposed = true;
    for (const mesh of retained) {
      ctx.group.remove(mesh);
      if (mesh.isInstancedMesh) mesh.dispose();
    }
    for (const resource of owned) resource.dispose();
    ctx.ui.replaceChildren();
  } };
}

// ../Cubiverse/src/games/minesweeper.js
var validateDimensions3 = (value) => {
  const d = Array.isArray(value) ? [...value] : [value?.x, value?.y, value?.z];
  if (d.length !== 3 || d.some((n) => !Number.isSafeInteger(n) || n < 1) || d.reduce((a, b) => a * b, 1) > 4096) throw new RangeError("XYZ must be positive integers, up to 4,096 cells.");
  return d;
};
var MINE_NUMBER_COLORS = ["#777777", "#0000ff", "#008000", "#ff0000", "#000080", "#800000", "#008080", "#000000", "#808080"];
var mineIndex = ([x, y, z], [w, h]) => x + w * (y + h * z);
var mineCoordinates = (index, [w, h]) => [index % w, Math.floor(index / w) % h, Math.floor(index / (w * h))];
function mineNeighbours(index, dimensions) {
  const p = mineCoordinates(index, dimensions), result = [];
  for (let x = -1; x <= 1; x++) for (let y = -1; y <= 1; y++) for (let z = -1; z <= 1; z++) {
    if (x === 0 && y === 0 && z === 0) continue;
    const n = [p[0] + x, p[1] + y, p[2] + z];
    if (n.every((v, i) => v >= 0 && v < dimensions[i])) result.push(mineIndex(n, dimensions));
  }
  return result;
}
var halfEven = (value) => {
  const floor = Math.floor(value);
  return value - floor === 0.5 ? floor + floor % 2 : Math.round(value);
};
var MinesweeperGame = class {
  constructor({ dimensions = [5, 8, 3], mineCount = null, random = Math.random } = {}) {
    dimensions = validateDimensions3(dimensions);
    if (mineCount !== null && (!Number.isInteger(mineCount) || mineCount < 0)) throw new RangeError("Invalid mine count");
    this.dimensions = [...dimensions];
    this.count = dimensions.reduce((a, b) => a * b, 1);
    this.random = random;
    this.requestedMines = Math.max(0, Math.min(this.count - 1, mineCount === null ? halfEven(this.count * 0.1) : Math.floor(mineCount)));
    this.reset();
  }
  reset() {
    this.mines = /* @__PURE__ */ new Set();
    this.revealed = /* @__PURE__ */ new Set();
    this.flags = /* @__PURE__ */ new Set();
    this.generated = false;
    this.exploded = null;
    this.elapsed = 0;
    this.started = false;
  }
  valid(index) {
    return Number.isInteger(index) && index >= 0 && index < this.count;
  }
  get mineCount() {
    return this.generated ? this.mines.size : this.requestedMines;
  }
  get status() {
    return this.exploded !== null ? "lost" : this.generated && this.revealed.size === this.count - this.mines.size ? "won" : "playing";
  }
  adjacent(index) {
    return mineNeighbours(index, this.dimensions).reduce((sum, i) => sum + Number(this.mines.has(i)), 0);
  }
  generate(first) {
    const protectedCells = /* @__PURE__ */ new Set([first, ...mineNeighbours(first, this.dimensions)]), candidates = [];
    for (let i = 0; i < this.count; i++) if (!protectedCells.has(i)) candidates.push(i);
    const count = Math.min(this.requestedMines, candidates.length);
    for (let i = 0; i < count; i++) {
      const j = i + Math.floor(this.random() * (candidates.length - i));
      [candidates[i], candidates[j]] = [candidates[j], candidates[i]];
      this.mines.add(candidates[i]);
    }
    this.generated = true;
  }
  reveal(index) {
    if (!this.valid(index) || this.status !== "playing" || this.flags.has(index) || this.revealed.has(index)) return false;
    if (!this.generated) this.generate(index);
    this.started = true;
    if (this.mines.has(index)) {
      this.exploded = index;
      return true;
    }
    const queue = [index];
    while (queue.length) {
      const current = queue.pop();
      if (this.revealed.has(current) || this.flags.has(current) || this.mines.has(current)) continue;
      this.revealed.add(current);
      if (this.adjacent(current) === 0) queue.push(...mineNeighbours(current, this.dimensions));
    }
    return true;
  }
  toggleFlag(index) {
    if (!this.valid(index) || this.status !== "playing" || this.revealed.has(index)) return false;
    if (this.flags.has(index)) this.flags.delete(index);
    else this.flags.add(index);
    return true;
  }
  chord(index) {
    if (!this.valid(index) || this.status !== "playing" || !this.revealed.has(index)) return false;
    const neighbours = mineNeighbours(index, this.dimensions), number = this.adjacent(index);
    if (number === 0 || neighbours.filter((i) => this.flags.has(i)).length !== number) return false;
    let changed = false;
    for (const neighbour of neighbours) {
      if (this.status !== "playing") break;
      if (!this.flags.has(neighbour) && !this.revealed.has(neighbour)) changed = this.reveal(neighbour) || changed;
    }
    return changed;
  }
  tick(dt) {
    if (this.started && this.status === "playing") this.elapsed += Math.max(0, dt);
  }
  getState() {
    return { dimensions: [...this.dimensions], mineCount: this.mineCount, requestedMines: this.requestedMines, generated: this.generated, mines: [...this.mines], revealed: [...this.revealed], flags: [...this.flags], exploded: this.exploded, status: this.status, elapsed: this.elapsed, started: this.started };
  }
};
function createGame8(ctx) {
  let game, spatial = true, dimensions = [5, 8, 3], selected = 0, hovered = null, lastSecond = -1;
  ctx.ui.innerHTML = '<div class="control-group"><label>Mode <select data-mode aria-label="Minesweeper mode"><option value="spatial">3D \xB7 26 neighbours</option><option value="classic">2D \xB7 10 \xD7 10 \xB7 10 mines</option></select></label></div><div data-game-hud class="control-row game-hud-score hud-minesweeper" style="padding:9px;background:#c0c0c0;border:2px solid #eee;justify-content:space-between"><strong data-counter aria-label="Mines remaining" style="background:#180000;color:#ff3232;font:700 24px monospace;padding:3px 6px">012</strong><button data-smile class="small-button" aria-label="Restart">\u{1F642}</button><strong data-time aria-label="Seconds elapsed" style="background:#180000;color:#ff3232;font:700 24px monospace;padding:3px 6px">000</strong></div>';
  const q = (s) => ctx.ui.querySelector(s) ?? ctx.hud?.querySelector(s), hud = q("[data-game-hud]");
  if (ctx.hud && hud) ctx.hud.append(hud);
  const pitch = () => spatial ? 1.22 : 1.02, world = (index) => mineCoordinates(index, game.dimensions).map((v, i) => (v - (game.dimensions[i] - 1) / 2) * pitch());
  function stats() {
    const remaining = game.mineCount - game.flags.size;
    ctx.setStats({ "Mines": game.mineCount, "Unflagged": remaining, "Revealed": game.revealed.size + "/" + (game.count - game.mineCount), "Time": Math.floor(game.elapsed) + " s", "Status": game.status === "won" ? "Complete" : game.status === "lost" ? "Mine hit" : "Playing" });
    q("[data-counter]").textContent = (remaining < 0 ? "-" : "") + String(Math.abs(remaining)).padStart(3, "0");
    q("[data-time]").textContent = String(Math.min(999, Math.floor(game.elapsed))).padStart(3, "0");
    q("[data-smile]").textContent = game.status === "lost" ? "\u2639" : game.status === "won" ? "\u{1F60E}" : "\u{1F642}";
  }
  function outline(voxels2, index, color, width = 0.026, { lengths = [0.98, spatial ? 0.98 : 0.32, 0.98], opacity = 1, cellState, part = "selection" } = {}) {
    const p = world(index);
    for (let axis = 0; axis < 3; axis++) for (const a of [-lengths[(axis + 1) % 3] / 2, lengths[(axis + 1) % 3] / 2]) for (const b of [-lengths[(axis + 2) % 3] / 2, lengths[(axis + 2) % 3] / 2]) {
      const c = [...p], s = [width, width, width];
      c[(axis + 1) % 3] += a;
      c[(axis + 2) % 3] += b;
      s[axis] = lengths[axis];
      voxels2.push({ x: c[0], y: c[1], z: c[2], sx: s[0], sy: s[1], sz: s[2], color, opacity, data: { index }, decoration: true, cellState, part });
    }
  }
  function render() {
    const voxels2 = [], labels2 = [];
    for (let index = 0; index < game.count; index++) {
      const [x, y, z] = world(index), open = game.revealed.has(index), flag = game.flags.has(index), mine = game.mines.has(index), lostMine = game.status === "lost" && mine, wrongFlag = game.status === "lost" && flag && !mine;
      const sy = spatial ? 0.9 : 0.25, opacity = 1, cellState = open ? "open" : "covered";
      if (open) {
        voxels2.push({ x, y, z, sx: 0.9, sy, sz: 0.9, color: "#ffffff", opacity: 0.01, pickOnly: true, data: { index }, cellState, part: "hit" });
        voxels2.push({ x, y: y - (spatial ? 0 : 0.06), z, sx: 0.64, sy: spatial ? 0.64 : 0.06, sz: 0.64, color: "#b7c0b4", opacity: 1, data: { index }, decoration: true, cellState, part: "open-face" });
        outline(voxels2, index, "#7f8e81", 0.022, { lengths: [0.78, spatial ? 0.78 : 0.13, 0.78], opacity: 1, cellState, part: "open-rim" });
        voxels2.push({ x, y: y - (spatial ? 0.36 : 0.09), z, sx: 0.74, sy: 0.028, sz: 0.74, color: "#cbd3c7", opacity: 1, data: { index }, decoration: true, cellState, part: "open-floor" });
      } else voxels2.push({ x, y, z, sx: 0.9, sy, sz: 0.9, color: index === game.exploded ? "#f44848" : "#9b9b9b", opacity, data: { index }, cellState, part: "raised-tile" });
      if (!open && !lostMine && game.count <= 512) {
        const lengths = [0.9, sy, 0.9];
        for (let axis = 0; axis < 3; axis++) for (const sign of [-1, 1]) {
          const c = [x, y, z], s = [0.78, spatial ? 0.78 : 0.18, 0.78];
          c[axis] += sign * (lengths[axis] / 2 + 6e-3);
          s[axis] = 0.016;
          voxels2.push({ x: c[0], y: c[1], z: c[2], sx: s[0], sy: s[1], sz: s[2], color: "#c0c0c0", opacity, data: { index }, decoration: true, cellState, part: "bevel" });
          const u = (axis + 1) % 3, v = (axis + 2) % 3;
          for (const side of [-1, 1]) {
            const edgePoint = [...c], edgeSize = [...s];
            edgePoint[u] += side * (lengths[u] / 2 - 0.04);
            edgeSize[u] = 0.045;
            edgeSize[v] = lengths[v] - 0.025;
            voxels2.push({ x: edgePoint[0], y: edgePoint[1], z: edgePoint[2], sx: edgeSize[0], sy: edgeSize[1], sz: edgeSize[2], color: side < 0 ? "#ffffff" : "#808080", opacity, data: { index }, decoration: true, cellState, part: "bevel" });
          }
        }
      }
      let text2 = "", color = "#111111";
      if (lostMine) {
        text2 = "\u2739";
        color = "#111111";
      } else if (wrongFlag) {
        text2 = "\xD7";
        color = "#d71919";
      } else if (flag) {
        text2 = "\u2691";
        color = "#db1515";
      } else if (open && game.adjacent(index)) {
        const number = game.adjacent(index);
        text2 = String(number);
        color = MINE_NUMBER_COLORS[number] ?? "#4c2589";
      }
      if (text2) labels2.push({ x, y: y - (open && !spatial ? 0.06 : 0), z, text: text2, color, cube: true, sx: open ? 0.68 : 0.946, sy: open ? spatial ? 0.68 : 0.08 : sy + 0.046, sz: open ? 0.68 : 0.946, data: { index }, cellState });
    }
    if (!spatial) voxels2.push({ x: 0, y: -0.24, z: 0, sx: 10.4, sy: 0.1, sz: 10.4, color: "#808080" });
    outline(voxels2, selected, "#438bd5");
    if (hovered !== null && hovered !== selected) outline(voxels2, hovered, "#f3c85a", 0.018);
    ctx.setVoxels(voxels2);
    ctx.setLabels(labels2);
    stats();
    if (game.status === "lost") ctx.message("Mine hit \xB7 \u2639 Restart");
    else if (game.status === "won") ctx.message("Complete \u2713");
  }
  function act(kind, index = selected) {
    if (!game.valid(index)) return;
    selected = index;
    const old = game.status, changed = kind === "flag" ? game.toggleFlag(index) : kind === "chord" ? game.chord(index) : game.reveal(index);
    if (changed) {
      ctx.sound?.(game.status === "lost" ? "error" : game.status === "won" ? "win" : "move");
      if (old === "playing" && game.status === "playing") ctx.message("Right click \u2192 \u2691 \xB7 X \u2192 slice");
    }
    render();
  }
  function moveCursor(key2) {
    const delta = (spatial ? ctx.spatial?.vectorForKey(key2) : null) ?? { arrowleft: [-1, 0, 0], arrowright: [1, 0, 0], arrowup: [0, 0, -1], arrowdown: [0, 0, 1] }[key2];
    if (!delta) return;
    const p = mineCoordinates(selected, game.dimensions), next = p.map((v, i) => Math.max(0, Math.min(game.dimensions[i] - 1, v + delta[i]))), index = mineIndex(next, game.dimensions);
    if (index === selected) return;
    selected = index;
    render();
    if (spatial) ctx.spatial?.follow?.({ target: world(selected), weight: 0.15 });
  }
  function reset() {
    game = new MinesweeperGame({ dimensions: spatial ? dimensions : [10, 1, 10], mineCount: spatial ? null : 10 });
    selected = 0;
    hovered = null;
    lastSecond = -1;
    render();
    if (spatial) {
      const extents = dimensions.map((n) => (n - 1) * pitch() + 1);
      ctx.spatial?.volume?.({ target: [0, 0, 0], distance: Math.max(...extents) * 2.5 + 2, size: extents });
    } else ctx.frame({ target: [0, 0, 0], distance: 25, position: [0, 25, 1e-3] });
    ctx.message("Left click \u2192 reveal \xB7 Right click \u2192 flag");
  }
  q("[data-mode]").onchange = () => {
    spatial = q("[data-mode]").value !== "classic";
    reset();
  };
  q("[data-smile]").onclick = reset;
  ctx.setRules?.("<p>Reveal every safe cell. Numbers count mines in up to 26 neighbours. The first cell and its neighbours are safe.</p><p>Left click reveals. Right click flags; right drag orbits. Click a revealed number to open neighbours when its flag count matches. X slices, double X reveals neighbours, Z restores all cells. F flags; C opens neighbours.</p>");
  reset();
  return {
    reset,
    getDimensions() {
      const [x, y, z] = game.dimensions;
      return { x, y, z };
    },
    setDimensions(value) {
      dimensions = validateDimensions3(value);
      spatial = true;
      q("[data-mode]").value = "spatial";
      reset();
    },
    getSelection() {
      const [x, y, z] = mineCoordinates(selected, game.dimensions);
      return { x, y, z };
    },
    selectCell(data) {
      if (game.valid(data?.index)) {
        selected = data.index;
        render();
      }
    },
    cellPosition(data) {
      return game.valid(data?.index) ? mineCoordinates(data.index, game.dimensions) : null;
    },
    render,
    update(dt) {
      game.tick(dt);
      const second = Math.floor(game.elapsed);
      if (second !== lastSecond) {
        lastSecond = second;
        stats();
      }
    },
    onPick(data) {
      if (!Number.isInteger(data?.index) || !game.valid(data.index)) return;
      act(game.revealed.has(data.index) ? "chord" : "reveal", data.index);
    },
    onSecondaryPick(data) {
      if (game.valid(data?.index)) act("flag", data.index);
    },
    onHover(data) {
      const next = game.valid(data?.index) ? data.index : null;
      if (next === hovered) return;
      hovered = next;
      render();
    },
    onKey(key2, event) {
      key2 = key2.toLowerCase();
      if (["arrowleft", "arrowright", "arrowup", "arrowdown"].includes(key2)) {
        event?.preventDefault();
        moveCursor(key2);
      } else if (key2 === "enter" || key2 === " ") {
        event?.preventDefault();
        act(game.revealed.has(selected) ? "chord" : "reveal");
      } else if (key2 === "f") act("flag");
      else if (key2 === "c") act("chord");
    },
    getState() {
      return { ...game.getState(), spatial, volume: spatial, selected, cursor: mineCoordinates(selected, game.dimensions), hovered };
    },
    dispose() {
      hud?.remove?.();
      ctx.ui.replaceChildren();
    }
  };
}

// ../Cubiverse/src/games/connect4.js
var CONNECT4_DIRECTIONS = Object.freeze([
  [1, 0, 0],
  [0, 1, 0],
  [0, 0, 1],
  [1, 1, 0],
  [1, -1, 0],
  [1, 0, 1],
  [1, 0, -1],
  [0, 1, 1],
  [0, 1, -1],
  [1, 1, 1],
  [1, 1, -1],
  [1, -1, 1],
  [1, -1, -1]
].map((direction) => Object.freeze(direction)));
var PITCH = 1.18;
var COLORS2 = [null, "#ffcf24", "#ef4050"];
var NAMES = [null, "Yellow", "Red"];
var BLUE = "#1f6fce";
var inside2 = (cell, dimensions) => Array.isArray(cell) && cell.length === 3 && cell.every((v, i) => Number.isInteger(v) && v >= 0 && v < dimensions[i]);
var equal2 = (a, b) => a?.every((v, i) => v === b?.[i]);
var connect4Index = ([x, y, z], [width, height]) => x + width * (y + height * z);
var connect4Coordinates = (index, [width, height]) => [index % width, Math.floor(index / width) % height, Math.floor(index / (width * height))];
var validateDimensions4 = (value) => {
  const d = Array.isArray(value) ? [...value] : [value?.x, value?.y, value?.z];
  if (d.length !== 3 || d.some((n) => !Number.isSafeInteger(n) || n < 1) || d.reduce((a, b) => a * b, 1) > 4096) throw new RangeError("XYZ must be positive integers, up to 4,096 cells.");
  return d;
};
function createConnectFourState(dimensions = [6, 4, 3]) {
  dimensions = validateDimensions4(dimensions);
  return { dimensions: [...dimensions], board: new Uint8Array(dimensions.reduce((a, b) => a * b, 1)), player: 1, winner: 0, status: "playing", moves: 0, lastMove: null, winningCells: [] };
}
var validGravity = (g) => Array.isArray(g) && g.length === 3 && g.every((n) => [-1, 0, 1].includes(n)) && g.filter(Boolean).length === 1;
function connect4LandingAt(state, selected, gravity = [0, -1, 0]) {
  if (!inside2(selected, state.dimensions) || !validGravity(gravity)) return null;
  const axis = gravity.findIndex(Boolean), sign = gravity[axis], cell = [...selected];
  cell[axis] = sign < 0 ? state.dimensions[axis] - 1 : 0;
  if (state.board[connect4Index(cell, state.dimensions)]) return null;
  let landing = [...cell];
  for (let n = 1; n < state.dimensions[axis]; n++) {
    cell[axis] += sign;
    if (state.board[connect4Index(cell, state.dimensions)]) break;
    landing = [...cell];
  }
  return landing;
}
function findConnectFourLine(state, origin, owner = null) {
  if (!inside2(origin, state.dimensions)) return [];
  owner ??= state.board[connect4Index(origin, state.dimensions)];
  if (!owner || state.board[connect4Index(origin, state.dimensions)] !== owner) return [];
  for (const direction of CONNECT4_DIRECTIONS) {
    const rays = [-1, 1].map((sign) => {
      const cells = [];
      for (let step = 1; ; step++) {
        const p = origin.map((v, i) => v + direction[i] * step * sign);
        if (!inside2(p, state.dimensions) || state.board[connect4Index(p, state.dimensions)] !== owner) break;
        cells.push(p);
      }
      return cells;
    });
    const line2 = [...rays[0].reverse(), [...origin], ...rays[1]];
    if (line2.length >= 4) return line2.slice(Math.max(0, rays[0].length - 3), Math.max(0, rays[0].length - 3) + 4);
  }
  return [];
}
function dropConnectFourAt(state, selected, gravity = [0, -1, 0]) {
  if (state.status !== "playing") return null;
  const cell = connect4LandingAt(state, selected, gravity);
  if (!cell) return null;
  const player = state.player;
  state.board[connect4Index(cell, state.dimensions)] = player;
  state.moves++;
  state.lastMove = { cell: [...cell], player };
  state.winningCells = findConnectFourLine(state, cell, player);
  if (state.winningCells.length) {
    state.status = "win";
    state.winner = player;
  } else if (state.moves === state.board.length) state.status = "draw";
  else state.player = 3 - player;
  return { cell: [...cell], player, status: state.status, winningCells: state.winningCells.map((p) => [...p]) };
}
function chooseConnectFourMove(state, gravity = [0, -1, 0]) {
  if (state.status !== "playing" || !validGravity(gravity)) return null;
  const axis = gravity.findIndex(Boolean), others = [0, 1, 2].filter((i) => i !== axis), candidates = [];
  for (let a = 0; a < state.dimensions[others[0]]; a++) for (let b = 0; b < state.dimensions[others[1]]; b++) {
    const cell = [0, 0, 0];
    cell[others[0]] = a;
    cell[others[1]] = b;
    const landing = connect4LandingAt(state, cell, gravity);
    if (landing) candidates.push(landing);
  }
  for (const player of [state.player, 3 - state.player]) for (const cell of candidates) {
    const i = connect4Index(cell, state.dimensions);
    state.board[i] = player;
    const won = findConnectFourLine(state, cell, player).length > 0;
    state.board[i] = 0;
    if (won) return [...cell];
  }
  candidates.sort((a, b) => others.reduce((sum, i) => sum + Math.abs(a[i] - (state.dimensions[i] - 1) / 2) - Math.abs(b[i] - (state.dimensions[i] - 1) / 2), 0));
  return candidates[0] ?? null;
}
function moveConnectFourCursor(cursor, delta, dimensions) {
  if (!Array.isArray(delta) || delta.length !== 3 || delta.some((n) => !Number.isInteger(n))) return [...cursor];
  return cursor.map((v, i) => Math.max(0, Math.min(dimensions[i] - 1, v + delta[i])));
}
function createGame9(ctx) {
  const THREE4 = ctx.THREE, world = new THREE4.Group(), geometries = /* @__PURE__ */ new Set(), materials = /* @__PURE__ */ new Set(), staticMeshes = [];
  world.name = "connect4-world";
  ctx.group.add(world);
  let spatial = true, dimensions = [6, 4, 3], solo = false, aiTimer = 0, state, cursor, hover = null, animation = null, disposed = false, boardKey = "", pieces, instanceForCell = /* @__PURE__ */ new Map(), lastFollow = null;
  const doc = ctx.ui.ownerDocument;
  const geo = (geometry) => (geometries.add(geometry), geometry);
  const material = (options) => {
    const value = new THREE4.MeshStandardMaterial(options);
    materials.add(value);
    return value;
  };
  const lineMaterial = (options) => {
    const value = new THREE4.LineBasicMaterial(options);
    materials.add(value);
    return value;
  };
  const box = geo(new THREE4.BoxGeometry(1, 1, 1)), sphere = geo(new THREE4.SphereGeometry(0.37, 18, 12)), disc = geo(new THREE4.CylinderGeometry(0.37, 0.37, 0.24, 28)), emptyDisc = geo(new THREE4.CylinderGeometry(0.42, 0.42, 0.035, 28));
  const socket = geo(new THREE4.TorusGeometry(0.435, 0.032, 5, 20)), edges = geo(new THREE4.EdgesGeometry(box));
  const pieceMat = material({ color: "#ffffff", roughness: 0.32, metalness: 0.08 });
  const ringMat = material({ color: BLUE, transparent: true, opacity: 0.15, depthWrite: false, roughness: 0.6 });
  const frameMat = material({ color: BLUE, roughness: 0.47, metalness: 0.04 });
  const emptyMat = material({ color: "#eef4fb", roughness: 0.7 });
  const ghostMat = material({ color: COLORS2[1], transparent: true, opacity: 0.36, depthWrite: false, roughness: 0.35 });
  const cursorMat = lineMaterial({ color: "#d69a06", transparent: true, opacity: 0.92, depthWrite: false });
  const columnMat = lineMaterial({ color: "#2ebd90", transparent: true, opacity: 0.65, depthWrite: false });
  const ghost2 = new THREE4.Mesh(sphere, ghostMat);
  ghost2.name = "connect4-landing-ghost";
  ghost2.renderOrder = 3;
  const cursorBox = new THREE4.LineSegments(edges, cursorMat);
  cursorBox.name = "connect4-cursor";
  const columnBox = new THREE4.LineSegments(edges, columnMat);
  columnBox.name = "connect4-gravity-column";
  const winMat = new THREE4.MeshBasicMaterial({ color: "#ffc43d", transparent: true, opacity: 0.9, depthTest: false, depthWrite: false });
  materials.add(winMat);
  const winMesh = new THREE4.Mesh(geo(new THREE4.CylinderGeometry(0.045, 0.045, 1, 10)), winMat);
  winMesh.name = "connect4-winning-line";
  winMesh.visible = false;
  winMesh.renderOrder = 6;
  world.add(ghost2, cursorBox, columnBox, winMesh);
  const temp = new THREE4.Object3D(), color = new THREE4.Color(), identity = new THREE4.Quaternion();
  const worldPosition = (cell) => cell.map((v, i) => (v - (state.dimensions[i] - 1) / 2) * PITCH);
  const gravity = () => spatial ? (ctx.spatial?.basis?.()?.up ?? [0, 1, 0]).map((n) => n === 0 ? 0 : -n) : [0, -1, 0];
  const landingAt = (cell) => connect4LandingAt(state, cell, gravity());
  const humanTurn = () => !solo || state.player === 1;
  const hud = doc.createElement("div");
  hud.className = "game-hud-score hud-connect4";
  ctx.hud?.append(hud);
  const button = (text2, action, primary = false) => {
    const el = doc.createElement("button");
    el.textContent = text2;
    el.className = primary ? "primary-button" : "small-button";
    el.onclick = action;
    return el;
  };
  const row = (...children) => {
    const el = doc.createElement("div");
    el.className = "control-row";
    el.append(...children);
    ctx.ui.append(el);
    return el;
  };
  const select = (label, options, action) => {
    const wrapper = doc.createElement("label");
    wrapper.textContent = label + " ";
    wrapper.className = "control-group";
    const el = doc.createElement("select");
    for (const [value, text2] of options) {
      const option = doc.createElement("option");
      option.value = value;
      option.textContent = text2;
      el.append(option);
    }
    el.onchange = () => action(el.value);
    wrapper.append(el);
    ctx.ui.append(wrapper);
    return { el, wrapper };
  };
  const modeSelect = select("Game mode", [["spatial", "3D"], ["classic", "2D"]], (value) => {
    spatial = value === "spatial";
    reset(true);
  });
  const opponentSelect = select("\u265F", [["local", "2P"], ["ai", "1P \xB7 AI"]], (value) => {
    solo = value === "ai";
    reset(false);
  });
  opponentSelect.el.setAttribute("aria-label", "Connect Four opponent");
  row(button("\u2191", () => move("arrowup")));
  row(button("\u2190", () => move("arrowleft")), button("\u2193", () => move("arrowdown")), button("\u2192", () => move("arrowright")));
  const turnRows = [
    row(button("W", () => turn("up")), button("S", () => turn("down"))),
    row(button("A", () => turn("left")), button("D", () => turn("right")))
  ];
  const dropButton = button("Drop \xB7 Enter", drop, true);
  row(dropButton, button("Restart", () => reset(false)));
  const status = doc.createElement("p");
  status.className = "hint";
  status.hidden = true;
  ctx.ui.append(status);
  const controls = doc.createElement("p");
  controls.className = "hint";
  controls.hidden = true;
  ctx.ui.append(controls);
  function matrix(mesh, index, position, scale = [1, 1, 1], rotation = identity) {
    temp.position.set(...position);
    temp.scale.set(...scale);
    temp.quaternion.copy(rotation);
    temp.updateMatrix();
    mesh.setMatrixAt(index, temp.matrix);
  }
  function addStatic(mesh, name) {
    mesh.name = name;
    world.add(mesh);
    staticMeshes.push(mesh);
    return mesh;
  }
  function clearStatic() {
    for (const mesh of staticMeshes) {
      world.remove(mesh);
      if (mesh.isInstancedMesh) mesh.dispose();
      if (mesh.userData.ownGeometry) {
        geometries.delete(mesh.geometry);
        mesh.geometry.dispose();
      }
    }
    staticMeshes.length = 0;
    pieces = null;
    instanceForCell.clear();
  }
  function buildBoard() {
    const key2 = `${spatial}/${state.dimensions.join("x")}`;
    if (key2 === boardKey) return;
    boardKey = key2;
    clearStatic();
    const [w, h, d] = state.dimensions, cells = Array.from({ length: w * h * d }, (_, index) => connect4Coordinates(index, state.dimensions));
    if (spatial) {
      const rotations = [identity, new THREE4.Quaternion().setFromAxisAngle(new THREE4.Vector3(0, 1, 0), Math.PI / 2), new THREE4.Quaternion().setFromAxisAngle(new THREE4.Vector3(1, 0, 0), Math.PI / 2)];
      for (let axis = 0; axis < 3; axis++) {
        const mesh = addStatic(new THREE4.InstancedMesh(socket, ringMat, cells.length), `connect4-sockets-${["xy", "yz", "xz"][axis]}`);
        mesh.userData.socketRotation = rotations[axis];
        mesh.userData.pickCells = cells.map((cell) => ({ cell }));
        cells.forEach((cell, index) => matrix(mesh, index, worldPosition(cell), [1, 1, 1], rotations[axis]));
        mesh.instanceMatrix.needsUpdate = true;
        mesh.computeBoundingSphere();
      }
      const voxels2 = cells.map((cell) => {
        const [x, y, z] = worldPosition(cell);
        return { x, y, z, sx: 0.94, sy: 0.94, sz: 0.94, color: BLUE, opacity: 0.01, pickOnly: true, data: { cell } };
      });
      ctx.setVoxels(voxels2);
      const beams = [];
      for (let axis = 0; axis < 3; axis++) for (const a of [-1, 1]) for (const b of [-1, 1]) {
        const position = [0, 0, 0], scale = [0.12, 0.12, 0.12];
        scale[axis] = state.dimensions[axis] * PITCH + 0.12;
        position[(axis + 1) % 3] = a * state.dimensions[(axis + 1) % 3] * PITCH / 2;
        position[(axis + 2) % 3] = b * state.dimensions[(axis + 2) % 3] * PITCH / 2;
        beams.push({ position, scale });
      }
      const frame2 = addStatic(new THREE4.InstancedMesh(box, frameMat, beams.length), "connect4-blue-cube-frame");
      beams.forEach(({ position, scale }, index) => matrix(frame2, index, position, scale));
      frame2.instanceMatrix.needsUpdate = true;
      frame2.computeBoundingSphere();
    } else {
      ctx.setVoxels([]);
      const width = w * PITCH + 0.18, height = h * PITCH + 0.18, shape = new THREE4.Shape();
      shape.moveTo(-width / 2, -height / 2);
      shape.lineTo(width / 2, -height / 2);
      shape.lineTo(width / 2, height / 2);
      shape.lineTo(-width / 2, height / 2);
      shape.closePath();
      for (const cell of cells) {
        const [x, y] = worldPosition(cell), hole = new THREE4.Path();
        hole.absarc(x, y, 0.445, 0, Math.PI * 2, true);
        shape.holes.push(hole);
      }
      const plate = addStatic(new THREE4.Mesh(geo(new THREE4.ExtrudeGeometry(shape, { depth: 0.22, bevelEnabled: true, bevelSegments: 1, steps: 1, bevelSize: 0.035, bevelThickness: 0.035, curveSegments: 16 })), frameMat), "connect4-classic-blue-plate");
      plate.position.z = -0.09;
      plate.userData.ownGeometry = true;
      const sockets = addStatic(new THREE4.InstancedMesh(emptyDisc, emptyMat, cells.length), "connect4-classic-sockets");
      sockets.userData.pickCells = cells.map((cell) => ({ cell }));
      const face = new THREE4.Quaternion().setFromAxisAngle(new THREE4.Vector3(1, 0, 0), Math.PI / 2);
      sockets.userData.socketRotation = face;
      cells.forEach((cell, index) => {
        const p = worldPosition(cell);
        p[2] = -0.1;
        matrix(sockets, index, p, [1, 1, 1], face);
      });
      sockets.instanceMatrix.needsUpdate = true;
      sockets.computeBoundingSphere();
    }
    pieces = addStatic(new THREE4.InstancedMesh(spatial ? sphere : disc, pieceMat, cells.length), "connect4-pieces");
    pieces.count = 0;
    pieces.frustumCulled = false;
    pieces.instanceMatrix.setUsage(THREE4.DynamicDrawUsage);
    ghost2.geometry = spatial ? sphere : disc;
    ghost2.rotation.x = spatial ? 0 : Math.PI / 2;
    ctx.setLabels([]);
  }
  function renderPieces() {
    for (const mesh of staticMeshes) if (mesh.userData.socketRotation) {
      mesh.userData.pickCells.forEach(({ cell }, index) => {
        const occupied = state.board[connect4Index(cell, state.dimensions)] !== 0, position = worldPosition(cell);
        if (!spatial) position[2] = -0.1;
        matrix(mesh, index, position, occupied ? [0, 0, 0] : [1, 1, 1], mesh.userData.socketRotation);
      });
      mesh.instanceMatrix.needsUpdate = true;
      mesh.computeBoundingSphere();
    }
    const winning = new Set(state.winningCells.map((p) => connect4Index(p, state.dimensions))), pickCells = [];
    instanceForCell.clear();
    let count = 0;
    for (let index = 0; index < state.board.length; index++) {
      const owner = state.board[index];
      if (!owner) continue;
      const cell = connect4Coordinates(index, state.dimensions), position = worldPosition(cell);
      if (!spatial) position[2] = 0.06;
      if (animation && index === animation.index) position[animation.axis] = animation.current;
      const rotation = spatial ? identity : new THREE4.Quaternion().setFromAxisAngle(new THREE4.Vector3(1, 0, 0), Math.PI / 2), scale = winning.has(index) ? 1.1 : 1;
      matrix(pieces, count, position, [scale, scale, scale], rotation);
      pieces.setColorAt(count, color.set(COLORS2[owner]));
      instanceForCell.set(index, count);
      pickCells.push({ cell });
      count++;
    }
    pieces.count = count;
    pieces.userData.pickCells = pickCells;
    pieces.instanceMatrix.needsUpdate = true;
    if (pieces.instanceColor) pieces.instanceColor.needsUpdate = true;
    pieces.computeBoundingSphere();
    winMesh.visible = spatial && state.status === "win" && !animation;
    if (winMesh.visible) {
      const start = new THREE4.Vector3(...worldPosition(state.winningCells[0])), end = new THREE4.Vector3(...worldPosition(state.winningCells.at(-1)));
      winMesh.position.copy(start).add(end).multiplyScalar(0.5);
      winMesh.scale.set(1, start.distanceTo(end), 1);
      winMesh.quaternion.setFromUnitVectors(new THREE4.Vector3(0, 1, 0), end.sub(start).normalize());
    }
  }
  function renderSelection() {
    const selected = hover ?? cursor, position = worldPosition(selected), landing = landingAt(selected), available = state.status === "playing" && !animation && humanTurn(), g = gravity(), axis = g.findIndex(Boolean);
    cursorBox.position.set(...position);
    cursorBox.scale.set(0.99, 0.99, spatial ? 0.99 : 0.34);
    cursorBox.visible = available;
    cursorMat.color.set(landing ? "#d69a06" : "#ed4051");
    const columnPosition = [...position], columnScale = [0.98, 0.98, spatial ? 0.98 : 0.4];
    columnPosition[axis] = 0;
    columnScale[axis] = state.dimensions[axis] * PITCH;
    columnBox.position.set(...columnPosition);
    columnBox.scale.set(...columnScale);
    columnBox.visible = available;
    columnMat.color.set(landing ? "#1dbd8c" : "#ed4051");
    ghost2.visible = available && !!landing;
    if (landing) {
      const p = worldPosition(landing);
      if (!spatial) p[2] = 0.09;
      ghost2.position.set(...p);
      ghostMat.color.set(COLORS2[state.player]);
    }
    dropButton.disabled = !available || !landingAt(cursor);
    const end = state.status === "win" ? `${NAMES[state.winner]} connects four!` : state.status === "draw" ? "Full board. Draw." : animation ? `${NAMES[animation.player]} dropping\u2026` : `${NAMES[state.player]} to drop.`;
    ctx.setStats({ "Turn": state.status === "win" ? NAMES[state.winner] + " wins" : state.status === "draw" ? "Draw" : NAMES[state.player], "Moves": `${state.moves} / ${state.board.length}`, "Cell XYZ": cursor.map((n) => n + 1).join(" / "), "Gravity": `${g[axis] < 0 ? "\u2212" : "+"}${"XYZ"[axis]}`, "Board": state.dimensions.join(" \xD7 ") });
    hud.textContent = `${state.status === "win" ? NAMES[state.winner] + " WIN" : state.status === "draw" ? "DRAW" : state.player === 1 ? "\u25CF Yellow" : "\u25CF Red"} \xB7 ${state.moves}\u3000\u2193 ${g[axis] < 0 ? "\u2212" : "+"}${"XYZ"[axis]}`;
    hud.style.color = state.player === 1 ? "#936600" : "#b63646";
    status.textContent = end + (state.status !== "playing" || animation ? "" : landing ? ` ${landing.map((n) => n + 1).join(" / ")}.` : " Full column.");
  }
  function follow(cell, weight = 0.22) {
    if (!spatial || !ctx.spatial?.follow) return;
    const target = worldPosition(cell), key2 = target.join(",");
    if (key2 === lastFollow) return;
    lastFollow = key2;
    ctx.spatial.follow({ target, weight });
  }
  function followFallingPiece() {
    if (!spatial || !animation || !ctx.spatial?.follow) return;
    const target = worldPosition(animation.cell);
    target[animation.axis] = animation.current;
    lastFollow = target.join(",");
    ctx.spatial.follow({ target, weight: 0.13 });
  }
  function finishMessage() {
    if (state.status === "win") {
      ctx.message(`${NAMES[state.winner]} wins \u2713`);
      ctx.sound?.("win");
    } else if (state.status === "draw") {
      ctx.message("Full board \xB7 Draw");
      ctx.sound?.("clear");
    } else ctx.message(`Turn ${NAMES[state.player]} \xB7 Enter \u2192 place`);
  }
  function drop(ai = false) {
    if (disposed || animation || state.status !== "playing" || ai !== true && !humanTurn()) return;
    const g = gravity(), axis = g.findIndex(Boolean), result = dropConnectFourAt(state, cursor, g);
    if (!result) {
      ctx.message("Full column. Choose another.");
      ctx.sound?.("error");
      renderSelection();
      return;
    }
    hover = null;
    cursor = [...result.cell];
    const start = (g[axis] < 0 ? state.dimensions[axis] / 2 + 0.7 : -state.dimensions[axis] / 2 - 0.7) * PITCH, end = worldPosition(result.cell)[axis];
    animation = { ...result, index: connect4Index(result.cell, state.dimensions), axis, elapsed: 0, duration: Math.min(0.55, 0.2 + Math.sqrt(Math.abs(start - end) / PITCH) * 0.1), start, end, current: start };
    renderPieces();
    renderSelection();
    followFallingPiece();
    ctx.sound?.("move");
    ctx.message(`${NAMES[result.player]} \u2193 ${g[axis] < 0 ? "\u2212" : "+"}${"XYZ"[axis]}`);
  }
  function move(key2) {
    if (disposed || animation || state.status !== "playing" || !humanTurn()) return;
    const delta = (spatial ? ctx.spatial?.vectorForKey?.(key2) : null) ?? { arrowleft: [-1, 0, 0], arrowright: [1, 0, 0], arrowup: [0, 1, 0], arrowdown: [0, -1, 0] }[key2];
    if (!delta) return;
    const next = moveConnectFourCursor(cursor, delta, state.dimensions);
    if (equal2(cursor, next)) return;
    cursor = next;
    hover = null;
    renderSelection();
    follow(cursor);
  }
  function turn(direction) {
    if (spatial && !disposed) ctx.spatial?.turn?.(direction);
  }
  function reset(fit = false) {
    if (disposed) return;
    state = createConnectFourState(spatial ? dimensions : [7, 6, 1]);
    cursor = [Math.floor(state.dimensions[0] / 2), state.dimensions[1] - 1, Math.floor(state.dimensions[2] / 2)];
    aiTimer = 0;
    hover = null;
    animation = null;
    lastFollow = null;
    modeSelect.el.value = spatial ? "spatial" : "classic";
    opponentSelect.el.value = solo ? "ai" : "local";
    turnRows.forEach((el) => el.hidden = !spatial);
    buildBoard();
    renderPieces();
    renderSelection();
    controls.textContent = "Arrows \u2192 column \xB7 Enter \u2192 drop \xB7 X \u2192 slice \xB7 Z \u2192 all";
    if (fit) {
      const [w, h, d] = state.dimensions, settings = { target: [0, 0, 0], distance: Math.max(w, h, d) * PITCH * 2.65, size: [w * PITCH + 0.3, h * PITCH + 1.8, d * PITCH + 0.3] };
      if (spatial && ctx.spatial?.volume) ctx.spatial.volume(settings);
      else ctx.frame({ ...settings, position: spatial ? void 0 : [0, 0, settings.distance] });
    }
    ctx.message("Yellow starts. Connect four.");
  }
  ctx.setRules?.("<p>Connect four on any axis or diagonal. Play against AI or a friend. XYZ is customisable.</p><p>New pieces fall toward screen-down. Rotate to change gravity. Arrows select; click or Enter drops. X slices, Z restores all cells.</p>");
  reset(true);
  return {
    reset() {
      reset(false);
    },
    getDimensions() {
      const [x, y, z] = state.dimensions;
      return { x, y, z };
    },
    setDimensions(value) {
      dimensions = validateDimensions4(value);
      spatial = true;
      reset(true);
    },
    getSelection() {
      const [x, y, z] = cursor;
      return { x, y, z };
    },
    cellPosition(data) {
      return inside2(data?.cell, state.dimensions) ? [...data.cell] : null;
    },
    selectCell(data) {
      if (inside2(data?.cell, state.dimensions)) {
        cursor = [...data.cell];
        hover = null;
        renderSelection();
      }
    },
    onCameraChange() {
      renderSelection();
    },
    render() {
      buildBoard();
      renderPieces();
      renderSelection();
    },
    update(dt) {
      if (disposed) return;
      if (!animation) {
        if (solo && state.player === 2 && state.status === "playing") {
          aiTimer += dt;
          if (aiTimer >= 0.45) {
            aiTimer = 0;
            const move2 = chooseConnectFourMove(state, gravity());
            if (move2) {
              cursor = move2;
              drop(true);
            }
          }
        }
        return;
      }
      animation.elapsed += Math.max(0, Math.min(0.05, Number.isFinite(dt) ? dt : 0));
      const t = Math.min(1, animation.elapsed / animation.duration);
      animation.current = t === 1 ? animation.end : animation.start + (animation.end - animation.start) * t * t;
      const index = instanceForCell.get(animation.index), position = worldPosition(animation.cell);
      position[animation.axis] = animation.current;
      if (!spatial) position[2] = 0.06;
      matrix(pieces, index, position, [1, 1, 1], spatial ? identity : new THREE4.Quaternion().setFromAxisAngle(new THREE4.Vector3(1, 0, 0), Math.PI / 2));
      pieces.instanceMatrix.needsUpdate = true;
      followFallingPiece();
      if (t === 1) {
        animation = null;
        renderPieces();
        renderSelection();
        finishMessage();
      }
    },
    onPick(data) {
      if (disposed || animation || state.status !== "playing" || !humanTurn() || !inside2(data?.cell, state.dimensions)) return;
      cursor = [...data.cell];
      hover = null;
      drop();
    },
    onHover(data) {
      if (disposed || animation || state.status !== "playing") return;
      const cell = inside2(data?.cell, state.dimensions) ? [...data.cell] : null;
      if (!cell && !hover || equal2(cell, hover)) return;
      hover = cell;
      renderSelection();
    },
    onKey(key2, event) {
      const normalized = key2.toLowerCase();
      if (normalized.startsWith("arrow")) {
        event?.preventDefault();
        move(normalized);
      } else if (normalized === "enter" || normalized === " ") {
        event?.preventDefault();
        drop();
      }
    },
    getState() {
      return { ...state, board: Array.from(state.board), dimensions: [...state.dimensions], lastMove: state.lastMove ? { cell: [...state.lastMove.cell], player: state.lastMove.player } : null, winningCells: state.winningCells.map((cell) => [...cell]), playerName: state.player === 1 ? "yellow" : "red", winnerName: state.winner ? state.winner === 1 ? "yellow" : "red" : null, spatial, volume: spatial, fullVolume: spatial, cursor: [...cursor], hover: hover ? [...hover] : null, landing: landingAt(cursor), falling: animation ? { cell: [...animation.cell], player: animation.player, axis: animation.axis, worldPosition: animation.current, worldY: animation.axis === 1 ? animation.current : worldPosition(animation.cell)[1] } : null, gravity: gravity(), opponent: solo ? "ai" : "local", aiThinking: solo && state.player === 2 && state.status === "playing", pitch: PITCH };
    },
    dispose() {
      if (disposed) return;
      disposed = true;
      clearStatic();
      ctx.group.remove(world);
      geometries.forEach((geometry) => geometry.dispose());
      materials.forEach((value) => value.dispose());
      ctx.ui.replaceChildren();
    }
  };
}

// ../Cubiverse/src/games/2048.js
var validateDimensions5 = (value) => {
  const d = Array.isArray(value) ? [...value] : [value?.x, value?.y, value?.z];
  if (d.length !== 3 || d.some((n) => !Number.isSafeInteger(n) || n < 1) || d.reduce((a, b) => a * b, 1) > 4096) throw new RangeError("XYZ must be positive integers; maximum 4096 cells.");
  return d;
};
var TILE_COLORS = {
  0: "#cdc1b4",
  2: "#eee4da",
  4: "#ede0c8",
  8: "#f2b179",
  16: "#f59563",
  32: "#f67c5f",
  64: "#f65e3b",
  128: "#edcf72",
  256: "#edcc61",
  512: "#edc850",
  1024: "#edc53f",
  2048: "#edc22e"
};
var tileIndex = ([x, y, z], [w, h]) => x + w * (y + h * z);
var tileCoordinates = (index, [w, h]) => [index % w, Math.floor(index / w) % h, Math.floor(index / (w * h))];
function merge2048Line(values) {
  const compact = values.filter((value) => value !== 0), merged = [];
  let score = 0;
  for (let i = 0; i < compact.length; i++) {
    if (i + 1 < compact.length && compact[i] === compact[i + 1]) {
      const combined = compact[i] * 2;
      merged.push(combined);
      score += combined;
      i++;
    } else merged.push(compact[i]);
  }
  return { values: merged.concat(Array(values.length - merged.length).fill(0)), score };
}
var Game2048 = class {
  constructor({ dimensions = [4, 4, 4], random = Math.random, spawnPolicy = "transformed", lossRule = spawnPolicy === "source-classic" ? "no-moves" : "full-board" } = {}) {
    dimensions = validateDimensions5(dimensions);
    this.dimensions = [...dimensions];
    this.count = dimensions.reduce((a, b) => a * b, 1);
    if (this.count < 2) throw new RangeError("2048 requires two cells");
    this.random = random;
    this.spawnPolicy = spawnPolicy === "source-classic" ? "source-classic" : "transformed";
    this.lossRule = lossRule === "no-moves" ? "no-moves" : "full-board";
    this.reset();
  }
  reset() {
    this.board = Array(this.count).fill(0);
    this.score = 0;
    this.moves = 0;
    this.spawned = 0;
    this.lastSpawn = null;
    this.lastMergeCount = 0;
    this.continuing = false;
    this.spawn();
    this.spawn();
  }
  spawn() {
    const empty = [];
    for (let i = 0; i < this.count; i++) if (this.board[i] === 0) empty.push(i);
    if (!empty.length) return false;
    const occupied = this.count - empty.length, total = this.board.reduce((sum, value) => sum + value, 0), index = empty[Math.floor(this.random() * empty.length)];
    const guaranteedTwo = this.spawnPolicy === "transformed" ? occupied < 2 : total === 0 || total === 2;
    this.board[index] = guaranteedTwo ? 2 : this.random() < 0.5 ? 2 : 4;
    this.lastSpawn = index;
    this.spawned++;
    return true;
  }
  move(axis, sign, { spawn = true } = {}) {
    if (this.gameOver || this.won && !this.continuing) return false;
    if (!Number.isInteger(axis) || axis < 0 || axis > 2 || ![-1, 1].includes(sign) || this.dimensions[axis] === 1) return false;
    const result = Array(this.count).fill(0), others = [0, 1, 2].filter((i) => i !== axis);
    let gained = 0;
    for (let a = 0; a < this.dimensions[others[0]]; a++) for (let b = 0; b < this.dimensions[others[1]]; b++) {
      const indices = [];
      for (let step = 0; step < this.dimensions[axis]; step++) {
        const p = [0, 0, 0];
        p[axis] = sign < 0 ? step : this.dimensions[axis] - 1 - step;
        p[others[0]] = a;
        p[others[1]] = b;
        indices.push(tileIndex(p, this.dimensions));
      }
      const line2 = merge2048Line(indices.map((i) => this.board[i]));
      gained += line2.score;
      for (let i = 0; i < indices.length; i++) result[indices[i]] = line2.values[i];
    }
    if (result.every((value, i) => value === this.board[i])) return false;
    this.lastMergeCount = this.board.filter(Boolean).length - result.filter(Boolean).length;
    this.board = result;
    this.score += gained;
    this.moves++;
    this.lastSpawn = null;
    if (spawn) this.spawn();
    return true;
  }
  get maxTile() {
    return Math.max(...this.board);
  }
  get won() {
    return this.maxTile >= 2048;
  }
  get gameOver() {
    if (this.board.includes(0)) return false;
    if (this.lossRule === "full-board") return true;
    for (let index = 0; index < this.count; index++) {
      const p = tileCoordinates(index, this.dimensions);
      for (let axis = 0; axis < 3; axis++) if (p[axis] + 1 < this.dimensions[axis]) {
        const next = [...p];
        next[axis]++;
        if (this.board[index] === this.board[tileIndex(next, this.dimensions)]) return false;
      }
    }
    return true;
  }
  continueAfterGoal() {
    if (!this.won || this.gameOver) return false;
    this.continuing = true;
    return true;
  }
  getState() {
    return { dimensions: [...this.dimensions], board: [...this.board], score: this.score, moves: this.moves, spawned: this.spawned, lastSpawn: this.lastSpawn, lastMergeCount: this.lastMergeCount, maxTile: this.maxTile, won: this.won, gameOver: this.gameOver, outcome: this.gameOver ? "lost" : this.won && !this.continuing ? "won" : "playing", continuing: this.continuing, spawnPolicy: this.spawnPolicy, lossRule: this.lossRule };
  }
};
function edge2048Direction(index, dimensions) {
  if (!Number.isInteger(index) || index < 0 || index >= dimensions.reduce((a, b) => a * b, 1)) return null;
  const p = tileCoordinates(index, dimensions), offsets = p.map((v, i) => v - (dimensions[i] - 1) / 2);
  let axis = -1;
  for (let i = 0; i < 3; i++) if (dimensions[i] > 1 && (axis < 0 || Math.abs(offsets[i]) > Math.abs(offsets[axis]))) axis = i;
  if (axis < 0 || offsets[axis] === 0) return null;
  const direction = [0, 0, 0];
  direction[axis] = offsets[axis] > 0 ? 1 : -1;
  return direction;
}
function createGame10(ctx) {
  let game, spatial = true, dimensions = [4, 4, 4], selected = null, hovered = null;
  const doc = ctx.ui.ownerDocument ?? globalThis.document;
  ctx.ui.innerHTML = '<div class="control-group"><label>Mode <select data-mode aria-label="2048 mode"><option value="spatial">3D</option><option value="classic">2D</option></select></label></div><div data-game-hud class="control-row game-hud-score hud-2048" style="justify-content:space-between;align-items:center"><strong style="font:700 40px Verdana,Arial,sans-serif;color:#776e65">2048</strong><div style="background:#bbada0;color:#f9f6f2;border-radius:5px;padding:8px 16px;text-align:center"><small>SCORE</small><br><strong data-score style="font:700 24px Verdana,Arial,sans-serif">0</strong></div></div><p data-position class="hint" hidden></p><div data-arrows class="control-row"></div><div data-turns class="control-row"></div><div class="control-row"><button data-continue class="primary-button" hidden>2048 \xB7 Keep going</button><button data-reset class="small-button">Restart</button></div><p class="hint" hidden>Slide matching numbers together. X slices; Z restores the whole view.</p>';
  const q = (s) => ctx.ui.querySelector(s) ?? ctx.hud?.querySelector(s), button = (text2, action) => {
    const b = doc.createElement("button");
    b.className = "small-button";
    b.textContent = text2;
    b.onclick = action;
    return b;
  };
  if (ctx.hud) {
    const hud = q("[data-game-hud]");
    if (hud) ctx.hud.append(hud);
  }
  const pitch = () => spatial ? 1.22 : 1.06, world = (index) => tileCoordinates(index, game.dimensions).map((v, i) => (v - (game.dimensions[i] - 1) / 2) * pitch());
  function render() {
    const voxels2 = [], labels2 = [], edge = spatial ? 0.94 : 0.98, sy = spatial ? 0.94 : 0.3;
    for (let index = 0; index < game.count; index++) {
      const [x, y, z] = world(index), value = game.board[index];
      voxels2.push({ x, y, z, sx: edge, sy: value ? sy : spatial ? 0.88 : 0.13, sz: edge, color: TILE_COLORS[value] ?? "#3c3a32", opacity: value || !spatial ? 1 : 0.1, data: { index } });
      if (value) labels2.push({ x, y, z, text: String(value), color: value <= 4 ? "#776e65" : "#f9f6f2", fontFamily: "Verdana, Arial, sans-serif", cube: true, sx: edge + 9e-3, sy: sy + 9e-3, sz: edge + 9e-3, data: { index } });
    }
    if (spatial) {
      const extents = game.dimensions.map((v) => (v - 1) * pitch() + 1);
      for (let axis = 0; axis < 3; axis++) for (const a of [-extents[(axis + 1) % 3] / 2, extents[(axis + 1) % 3] / 2]) for (const b of [-extents[(axis + 2) % 3] / 2, extents[(axis + 2) % 3] / 2]) {
        const p = [0, 0, 0], s = [0.023, 0.023, 0.023];
        p[(axis + 1) % 3] = a;
        p[(axis + 2) % 3] = b;
        s[axis] = extents[axis];
        voxels2.push({ x: p[0], y: p[1], z: p[2], sx: s[0], sy: s[1], sz: s[2], color: "#bbada0", opacity: 0.55 });
      }
    } else voxels2.push({ x: 0, y: -0.25, z: 0, sx: 4.4, sy: 0.12, sz: 4.4, color: "#bbada0" });
    if (hovered !== null) {
      const [x, y, z] = world(hovered);
      voxels2.push({ x, y: y + (spatial ? 0 : 0.23), z, sx: edge + 0.06, sy: spatial ? edge + 0.06 : 0.035, sz: edge + 0.06, color: "#ffeab6", opacity: 0.16 });
    }
    ctx.setVoxels(voxels2);
    ctx.setLabels(labels2);
    q("[data-score]").textContent = String(game.score);
    q("[data-continue]").hidden = !game.won || game.continuing || game.gameOver;
    const state = game.gameOver ? game.lossRule === "full-board" ? "Board full" : "No moves" : game.won && !game.continuing ? "2048!" : game.continuing ? "Keep going" : "Playing";
    ctx.setStats({ "Score": game.score, "Best tile": game.maxTile, "Moves": game.moves, "Empty": game.board.filter((v) => !v).length, "Status": state });
    q("[data-position]").textContent = (spatial ? game.dimensions.join(" \xD7 ") : "Classic 4\xD74") + " \xB7 " + (hovered !== null ? "XYZ " + tileCoordinates(hovered, game.dimensions).map((v) => v + 1).join(" / ") : "Right drag to orbit \xB7 Arrows to slide");
    if (game.gameOver) ctx.message((game.lossRule === "full-board" ? "BOARD FULL" : "NO MOVES") + " \xB7 \u21BB Restart");
    else if (game.won && !game.continuing) ctx.message("2048 \u2713 \xB7 \u25B6 Keep going");
  }
  function shift(vector) {
    if (!vector || game.gameOver || game.won && !game.continuing) return;
    const axis = vector.findIndex((v) => v !== 0);
    if (axis < 0) return;
    const changed = game.move(axis, vector[axis]);
    if (changed) {
      selected = null;
      hovered = null;
      ctx.sound?.(game.gameOver ? "error" : game.won ? "win" : game.lastMergeCount ? "clear" : "move");
      render();
      if (!game.won && !game.gameOver) ctx.message(["X", "Y", "Z"][axis] + " " + (vector[axis] > 0 ? "\uFF0B" : "\u2212") + " \xB7 " + (game.lastMergeCount ? "Merge " + game.lastMergeCount : "Slide"));
    } else ctx.message("No move in that direction");
  }
  function direction(key2) {
    const vector = (spatial ? ctx.spatial?.vectorForKey(key2) : null) ?? { arrowleft: [-1, 0, 0], arrowright: [1, 0, 0], arrowup: [0, 0, -1], arrowdown: [0, 0, 1] }[key2];
    shift(vector);
  }
  function reset() {
    game = new Game2048({ dimensions: spatial ? dimensions : [4, 1, 4], spawnPolicy: spatial ? "transformed" : "source-classic" });
    selected = null;
    hovered = null;
    q("[data-turns]").hidden = !spatial;
    render();
    if (spatial) {
      const extents = dimensions.map((n) => (n - 1) * pitch() + 1);
      ctx.spatial?.volume?.({ target: [0, 0, 0], distance: Math.max(...extents) * 2.5 + 2, size: extents });
    } else ctx.frame({ target: [0, 0, 0], distance: 12, position: [0, 12, 1e-3] });
    if (!game.gameOver) ctx.message(spatial ? "Swipe \xB7 X Slice \xB7 Z All" : "Slide matching numbers together");
  }
  q("[data-arrows]").replaceChildren(...[["arrowup", "\u2191 Slide"], ["arrowleft", "\u2190 Slide"], ["arrowdown", "\u2193 Slide"], ["arrowright", "Slide \u2192"]].map(([key2, text2]) => {
    const b = button(text2, () => direction(key2));
    b.setAttribute("data-direction", key2);
    return b;
  }));
  q("[data-turns]").replaceChildren(...[["up", "W \u21A5"], ["down", "S \u21A7"], ["left", "A \u21B6"], ["right", "D \u21B7"]].map(([turn, text2]) => {
    const b = button(text2, () => ctx.spatial?.turn?.(turn));
    b.setAttribute("data-turn", turn);
    return b;
  }));
  q("[data-mode]").onchange = () => {
    spatial = q("[data-mode]").value !== "classic";
    reset();
  };
  q("[data-reset]").onclick = reset;
  q("[data-continue]").onclick = () => {
    if (game.continueAfterGoal()) {
      render();
      ctx.message("Keep going \u2713");
    }
  };
  ctx.setRules?.("<p>Slide matching numbers together. Each tile merges once per move. Valid moves add a new tile.</p><p>Reach 2048 to win. In 3D, filling the final empty cell ends the run immediately, even if a merge remains. The 2D Classic option ends only when no moves remain.</p><p>Swipe or use arrows. Right drag to orbit. X slices; Z restores the whole view.</p>");
  reset();
  return {
    reset,
    getDimensions() {
      const [x, y, z] = game.dimensions;
      return { x, y, z };
    },
    setDimensions(value) {
      const next = validateDimensions5(value);
      if (next.reduce((a, b) => a * b, 1) < 2) throw new RangeError("2048 requires at least 2 cells.");
      dimensions = next;
      spatial = true;
      q("[data-mode]").value = "spatial";
      reset();
    },
    getSelection() {
      const [x, y, z] = tileCoordinates(selected ?? hovered ?? Math.floor(game.count / 2), game.dimensions);
      return { x, y, z };
    },
    selectCell(data) {
      if (Number.isInteger(data?.index) && data.index >= 0 && data.index < game.count) selected = data.index;
    },
    cellPosition(data) {
      return Number.isInteger(data?.index) && data.index >= 0 && data.index < game.count ? tileCoordinates(data.index, game.dimensions) : null;
    },
    render,
    onSwipe(key2) {
      direction(key2.toLowerCase());
    },
    update() {
    },
    onKey(key2, event) {
      key2 = key2.toLowerCase();
      if (["arrowup", "arrowleft", "arrowdown", "arrowright"].includes(key2)) {
        event?.preventDefault();
        if (!event?.repeat) direction(key2);
      }
    },
    onPick(data) {
      if (Number.isInteger(data?.index)) {
        selected = data.index;
        shift(edge2048Direction(data.index, game.dimensions));
      }
    },
    onHover(data) {
      const next = Number.isInteger(data?.index) && data.index >= 0 && data.index < game.count ? data.index : null;
      if (next === hovered) return;
      hovered = next;
      render();
    },
    getState() {
      return { ...game.getState(), spatial, volume: spatial, selected, hovered };
    },
    dispose() {
      ctx.ui.replaceChildren();
    }
  };
}

// tools/cubiverse-runtime-entry.js
var factories = { tetris: createGame, sudoku: createGame2, pacman: createGame3, blokus: createGame4, numpuz: createGame5, match3: createGame6, tictactoe: createGame7, minesweeper: createGame8, connect4: createGame9, "2048": createGame10 };
export {
  CubeLabels,
  OrbitControls,
  Playground,
  SliceRenderer,
  SliceState,
  coordinate,
  cubeTurnForKey,
  factories,
  games
};
