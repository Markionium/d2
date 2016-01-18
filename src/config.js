import defaultConfig from './defaultConfig';
import {isType, isString} from './lib/check';

export default class Config {
    static create(...args) {
        const configObjects = args
            .filter(arg => arg);

        if (!configObjects.every(configObject => isType(configObject, 'object'))) {
            throw new Error('Expected Config parameter to have type object');
        }

        return Object.assign({}, defaultConfig, ...args);
    }

    static processConfigForD2(config, d2) {
        const api = d2.Api.getApi();
        d2.model.ModelDefinition.prototype.api = api;
        d2.models = d2.model.ModelDefinitions.getModelDefinitions();

        if (isString(config.baseUrl)) {
            api.setBaseUrl(config.baseUrl);
        } else {
            api.setBaseUrl('/api');
        }

        if (config.i18n && config.i18n.sources) {
            Array.from(config.i18n.sources)
                .forEach(source => d2.i18n.addSource(source));
        }

        if (config.i18n && config.i18n.strings) {
            d2.i18n.addStrings(Array.from(config.i18n.strings));
        }
    }
}
