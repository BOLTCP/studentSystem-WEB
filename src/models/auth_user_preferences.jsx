import React from 'react';

class UserPreferences {
  constructor({
    userPreferencesId,
    appTheme,
    userId
  }) {
    this.userPreferencesId = userPreferencesId;
    this.appTheme = appTheme;
    this.userId = userId;
  }

  static fromJsonUserPreferences(json) {
    try {
      return new UserPreferences({
        userPreferencesId: json.user_preferences_id,
        appTheme: json.app_theme,
        userId: json.user_id
      });
    } catch (error) {
      console.error('Error parsing UserPreferences from JSON:', error);
      return null; // Or throw the error, depending on your error handling strategy
    }
  }

  static fromJsonButInApp(json) {
    try {
      return new UserPreferences({
        userPreferencesId: json.userPreferencesId,
        appTheme: json.appTheme,
        userId: json.userId
      });
    } catch (error) {
      console.error('Error parsing UserPreferences from JSON string:', error);
      return null; 
    }
  }

  toString() {
    return `UserPreferences(user_role: ${this.userRole})`;
  }
}

export default UserPreferences;