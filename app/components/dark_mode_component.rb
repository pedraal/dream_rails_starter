# frozen_string_literal: true

class DarkModeComponent < ViewComponent::Base
  def call
    tag.button class: 'btn btn-default rounded-full', data: { controller: 'dark-mode', action: 'dark-mode#toggle' } do
      concat tag.span "🌙", class: 'dark:hidden block'
      concat tag.span "🔅", class: 'dark:block hidden'
    end
  end
end
