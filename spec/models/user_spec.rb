# frozen_string_literal: true

require 'rails_helper'

RSpec.describe User, type: :model do
  context 'validations' do
    it 'should return errors' do
      user = User.new(
        first_name: '',
        last_name: '',
        role: '',
        email: '',
        password: '',
        password_confirmation: 'asd'
      )

      user.valid?
      expect(user.errors.size).to eq 6
    end

    it 'should pass' do
      user = User.new(
        first_name: 'Emplo',
        last_name: 'Yee',
        role: 0,
        email: 'emplo@gmail.com',
        password: 'asdfasdf',
        password_confirmation: 'asdfasdf'
      )
      user.valid?
      pp user.errors
      expect(user.valid?).to eq true
    end
  end

  context 'scope' do
    before(:each) do
      User.new(
        first_name: 'Alpha',
        last_name: 'Anre',
        role: 1,
        email: 'alpha@gmail.com',
        password: 'asdfasdf',
        password_confirmation: 'asdfasdf'
      ).save
      User.new(
        first_name: 'Beta',
        last_name: 'Sorn',
        role: 1,
        email: 'beta@gmail.com',
        password: 'asdfasdf',
        password_confirmation: 'asdfasdf'
      ).save
      User.new(
        first_name: 'Charlie',
        last_name: 'Threo',
        role: 0,
        email: 'charlie@gmail.com',
        password: 'asdfasdf',
        password_confirmation: 'asdfasdf'
      ).save
      User.new(
        first_name: 'Delta',
        last_name: 'Feower',
        role: 0,
        email: 'delta@gmail.com',
        password: 'asdfasdf',
        password_confirmation: 'asdfasdf'
      ).save
      User.new(
        first_name: 'Echo',
        last_name: 'Funf',
        role: 0,
        email: 'echo@gmail.com',
        password: 'asdfasdf',
        password_confirmation: 'asdfasdf'
      ).save
    end

    it 'should return managers' do
      expect(User.manager_users.size).to eq(2)
    end

    it 'should return employees' do
      expect(User.employee_users.size).to eq(3)
    end
  end
end
