import { Application } from '@hotwired/stimulus'
import type { ControllerImport } from './stimulus_controller_resolver'
import StimulusControllerResolver from './stimulus_controller_resolver'

const application = Application.start()
StimulusControllerResolver.install(application, import.meta.glob('./**/*_controller.ts') as ControllerImport)
