# frozen_string_literal: true

class UsersController < ApplicationController
  def index
    @users = User.all
    render json: @users
  end

  def create
    if User.find_by(name: user_params[:name])
      @user = User.find_by(name: user_params[:name])
    else
      @user = User.create(user_params)
    end
    render json: @user
  end

  private

  def user_params
    params.permit(:name, :progress)
  end
end
