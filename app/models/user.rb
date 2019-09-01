class User < ApplicationRecord
  enum role: %i[employee manager]
  devise :database_authenticatable,
         :registerable,
         :rememberable,
         :validatable
  has_secure_password
end
