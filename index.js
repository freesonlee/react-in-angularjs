"use strict";var _client=require("react-dom/client");function ownKeys(object,enumerableOnly){var keys=Object.keys(object);if(Object.getOwnPropertySymbols){var symbols=Object.getOwnPropertySymbols(object);enumerableOnly&&(symbols=symbols.filter(function(sym){return Object.getOwnPropertyDescriptor(object,sym).enumerable})),keys.push.apply(keys,symbols)}return keys}function _objectSpread(target){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?ownKeys(Object(source),!0).forEach(function(key){_defineProperty(target,key,source[key])}):Object.getOwnPropertyDescriptors?Object.defineProperties(target,Object.getOwnPropertyDescriptors(source)):ownKeys(Object(source)).forEach(function(key){Object.defineProperty(target,key,Object.getOwnPropertyDescriptor(source,key))})}return target}function _defineProperty(obj,key,value){if(key in obj){Object.defineProperty(obj,key,{value:value,enumerable:true,configurable:true,writable:true})}else{obj[key]=value}return obj}var React=require("react");var ReactDOM=require("react-dom");var isPlainObject=require("lodash/isPlainObject");var isEqual=require("lodash/isEqual");function angularize(Component,componentName,angularApp,bindings,options){bindings=bindings||{};if(typeof window==="undefined"||typeof angularApp==="undefined")return;var componentOptions={bindings:bindings,template:options!==null&&options!==void 0&&options.transclude?"<ng-transclude></ng-transclude>":undefined,controller:["$element","$timeout",function($element,$timeout){var _this=this;if(window.angular){this.$scope=window.angular.element($element).scope();var previous={};this.$onInit=function(){for(var _i=0,_Object$keys=Object.keys(bindings);_i<_Object$keys.length;_i++){var bindingKey=_Object$keys[_i];if(/^data[A-Z]/.test(bindingKey)){console.warn("'".concat(bindingKey,"' binding for ").concat(componentName," component will be undefined because AngularJS ignores attributes starting with data-"))}if(bindings[bindingKey]==="="){previous[bindingKey]=window.angular.copy(_this[bindingKey])}}};this.$doCheck=function(){for(var _i2=0,_Object$keys2=Object.keys(previous);_i2<_Object$keys2.length;_i2++){var previousKey=_Object$keys2[_i2];if(!equals(_this[previousKey],previous[previousKey])){_this.$onChanges();previous[previousKey]=window.angular.copy(_this[previousKey]);return}}}};this.$onDestroy=function(){_this.reactRoot.unmount()};this.$onChanges=function(){if(options!==null&&options!==void 0&&options.transclude){if(!_this.reactRoot){var reactContainer=$element.clone();reactContainer.insertAfter($element);_this.reactRoot=(0,_client.createRoot)(reactContainer[0]);_this.reactRoot.render(React.createElement(Component,_this,[React.createElement(function(){return React.createElement("ng-transclude",null)},{key:"transcluded"})]));$timeout(function(){reactContainer.ready(function(){$element.children().replaceAll(reactContainer.find("ng-transclude"));$element[0].attributes.length;for(var index=0;index<$element[0].attributes.length;index++){var att=$element[0].attributes[index];reactContainer.attr(att.name,att.value)}var obs=new MutationObserver(function(mutations){mutations.forEach(function(m){if(m.target[m.attributeName]){reactContainer.attr(m.attributeName,m.target.attributes[m.attributeName].value)}else{reactContainer.removeAttr(m.attributeName)}})});obs.observe($element[0],{attributes:true})})},0)}}else{if(!_this.reactRoot){_this.reactRoot=(0,_client.createRoot)($element[0])}_this.reactRoot.render(React.createElement(Component,_this))}}}]};if(options){componentOptions=_objectSpread(_objectSpread({},componentOptions),options)}angularApp.component(componentName,componentOptions)}function angularizeDirective(Component,directiveName,angularApp,bindings){bindings=bindings||{};if(typeof window==="undefined"||typeof angularApp==="undefined")return;angularApp.directive(directiveName,function(){return{scope:bindings,replace:true,link:function link(scope,element){scope.$scope=scope;ReactDOM.render(React.createElement(Component,scope),element[0]);var keys=[];for(var _i3=0,_Object$keys3=Object.keys(bindings);_i3<_Object$keys3.length;_i3++){var bindingKey=_Object$keys3[_i3];if(/^data[A-Z]/.test(bindingKey)){console.warn("'".concat(bindingKey,"' binding for ").concat(directiveName," directive will be undefined because AngularJS ignores attributes starting with data-"))}if(bindings[bindingKey]!=="&"){keys.push(bindingKey)}}scope.$watchGroup(keys,function(){ReactDOM.render(React.createElement(Component,scope),element[0])})}}})}function getService(serviceName){if(typeof window==="undefined"||typeof window.angular==="undefined")return{};return window.angular.element(document.body).injector().get(serviceName)}function equals(o1,o2){if(isPlainObject(o1)&&isPlainObject(o2)){return isEqual(o1,o2)}return window.angular.equals(o1,o2)}module.exports={getService:getService,angularize:angularize,angularizeDirective:angularizeDirective};