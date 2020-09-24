module CurrentUserConcern
    extend ActiveSupport::Concern
    
    included do
        before_action :set_current_user
    end
    # is the session user_id exists, create an instance to allow methods in app to check for current user
    def set_current_user
        if session[:user_id]
            @current_user = User.find(session[:user_id])
        end
    end

end
