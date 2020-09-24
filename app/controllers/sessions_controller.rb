class SessionsController < ApplicationController
    # CurrentUserConcern is a concerns module 
    include CurrentUserConcern 

    def create
        user = User
                .find_by(email: params['user']['email'])
                .try(:authenticate, params['user']['password'])

        if user
            session[:user_id] = user.id
            render json: {
                status: :created,
                logged_in: true,
                user: user
            }
        else
            render json: {
                status: 401,
                message: "Username or Password Incorrect.  Try Again"
            }
        end 
    end

    # Checks to see if a user is currently logged in (uses the CurrentUserConcern on line 2)
    def logged_in
        if @current_user
            render json: {
                logged_in: true,
                user: @current_user
            }
        else
            render json: {
                logged_in: false
            }
        end
    end

    def logout
        reset_session
        render json: {
            status: 200, 
            logged_out: true
        }
    end 

end
