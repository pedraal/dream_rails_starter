# frozen_string_literal: true

class DarkModeComponentPreview < ViewComponent::Preview
  def default
    render(DarkModeComponent.new)
  end
end
