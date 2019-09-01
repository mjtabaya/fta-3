# frozen_string_literal: true

Rails.application.routes.draw do
  devise_for :users
  root to: 'static#home'

  get '*path', to: "application#fallback_index_html", constraints: ->(request) do
    !request.xhr? && request.format.html?
  end
end
