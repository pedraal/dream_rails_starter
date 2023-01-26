import type { Application, ControllerConstructor } from '@hotwired/stimulus'
import { AttributeObserver } from '@hotwired/stimulus'
import { identifierForGlobKey } from 'stimulus-vite-helpers'

export interface ControllerModule {
  default: ControllerConstructor
}

export type ControllerImport = Record<string, () => Promise<ControllerModule>>

export default class StimulusControllerResolver {
  application: Application
  loadingControllers: Record<string, boolean>
  observer: AttributeObserver
  globResults: ControllerImport[]
  controllerLoaders: ControllerImport

  static install(application: Application, ...globResults: ControllerImport[]) {
    const instance = new this(application, globResults)
    return instance
  }

  constructor(application: Application, globResults: ControllerImport[]) {
    this.application = application
    this.loadingControllers = {}
    this.globResults = globResults

    this.controllerLoaders = this.mapGlobKeysToIdentifiers()

    this.loadStimulusControllers = this.loadStimulusControllers.bind(this)

    this.observer = new AttributeObserver(
      application.element,
      application.schema.controllerAttribute,
      {
        elementMatchedAttribute: this.loadStimulusControllers,
        elementAttributeValueChanged: this.loadStimulusControllers,
      },
    )

    this.observer.start()
  }

  loadStimulusControllers(element: HTMLElement) {
    const controllerNames = element.getAttribute(this.application.schema.controllerAttribute)?.split(/\s+/)

    if (!controllerNames?.length)
      return

    controllerNames.forEach(controllerName =>
      this.loadController(controllerName),
    )
  }

  async loadController(controllerName: string) {
    if (
      !this.loadingControllers[controllerName]
      && !this.application.router.modules.find(module => module.definition.identifier === controllerName)
    ) {
      this.loadingControllers[controllerName] = true

      const controllerDefinition = await this.resolveController(controllerName)

      if (controllerDefinition)
        this.application.register(controllerName, controllerDefinition)

      delete this.loadingControllers[controllerName]
    }
  }

  async resolveController(controllerName: string) {
    const loader = this.controllerLoaders[controllerName]

    if (import.meta.env.DEV) {
      if (!loader) {
        console.warn(
            `Stimulus Controller Resolver can't resolve "${controllerName}". Available:`,
            Object.keys(this.controllerLoaders),
        )
        return
      }
    }

    return (await loader()).default
  }

  mapGlobKeysToIdentifiers() {
    return Object.entries(Object.assign({}, ...this.globResults) as ControllerImport).reduce(
      (acc, [key, controllerFn]) => {
        const identifier = identifierForGlobKey(key)
        if (!identifier)
          throw new Error('Invalid Stimulus controller filename')
        acc[identifier] = controllerFn
        return acc
      },
      {} as ControllerImport,
    )
  }
}
