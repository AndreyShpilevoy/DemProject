//Context ussed here!
//taked it here https://gist.github.com/alexeychikk/add4db3397df9feb2a0daf155376a5a8
class ReduxContextFix {
    constructor() {
        if (ReduxContextFix.instance) return ReduxContextFix.instance;
        ReduxContextFix.instance = this;

        this.contexts = {};
        this.connectedComponets = {};
    }

    connect(component) {
        let componentClass = Object.getPrototypeOf(component).constructor;
        for (let contextName in componentClass.contextTypes) {
            if (this.contexts[contextName]) {
                this.connectedComponets[contextName] = this.connectedComponets[contextName] || [];
                this.connectedComponets[contextName].push(component);
                let cwum = component.componentWillUnmount;
                component.componentWillUnmount = () => {
                    cwum && cwum.call(component);
                    this.connectedComponets[contextName] = this.connectedComponets[contextName]
                        .filter(c => c !== component);
                };
            }
        }
    }

    register(component) {
        if (!component.getChildContext) throw new Error('Component must provide context!');

        let context = component.getChildContext();
        for (let cname in context) {
            this.contexts[cname] = true;
        }
    }

    notify(newState) {
        for (let key in newState) {
            if (this.contexts[key]) {
                let context = newState[key];
                let connectedComponents = this.connectedComponets[key];
                if (!connectedComponents) continue;

                for (let i = 0, length = connectedComponents.length; i < length; i++) {
                    let cc = connectedComponents[i];
                    cc.context[key] = context;
                    cc.forceUpdate();
                }
            }
        }
    }
}

export default (new ReduxContextFix());
