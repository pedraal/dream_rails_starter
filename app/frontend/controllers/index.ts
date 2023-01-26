import { Application } from '@hotwired/stimulus'
import DarkMode from '../../components/dark_mode_controller'
import type { ControllerImport } from './stimulus_controller_resolver'
import StimulusControllerResolver from './stimulus_controller_resolver'

const application = Application.start()
application.register('dark-mode', DarkMode)
StimulusControllerResolver.install(
  application,
  import.meta.glob('./**/*_controller.ts') as ControllerImport,
  import.meta.glob('../../components/**/*_controller.ts') as ControllerImport,
)
