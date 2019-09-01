# frozen_string_literal: true

class User < ApplicationRecord
  scope :employee_users, -> { where(role: 'employee') }
  scope :manager_users, -> { where(role: 'manager') }
  enum role: %i[employee manager]
  devise :database_authenticatable,
         :registerable,
         :rememberable,
         :validatable
  validates :first_name, presence: true
  validates :last_name, presence: true
  validates :password_confirmation, presence: true
  before_validation :check_valid_roles

  private

  def check_valid_roles
    errors[:role] << 'Invalid Role' unless %w[employee manager].include?(role)
  end
end
