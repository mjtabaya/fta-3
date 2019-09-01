class User < ApplicationRecord
  enum role: %i[employee manager]
  devise :database_authenticatable,
         :registerable,
         :rememberable,
         :validatable
end
