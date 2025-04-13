import React from 'react';

class AuthUser {
  constructor({
    userId,
    loginName,
    passwordHash,
    profilePicture,
    registryNumber,
    familyTreeName,
    fname,
    lname,
    birthday,
    gender,
    citizenship,
    stateCity,
    townDistrict,
    validAddress,
    stateCityLiving,
    townDistrictLiving,
    validAddressLiving,
    postalAddress,
    homePhoneNumber,
    phoneNumber,
    phoneNumberEmergency,
    country,
    ethnicity,
    socialBackground,
    stateCityOfBirth,
    townDistrictOfBirth,
    placeOfBirth,
    education,
    currentAcademicDegree,
    profession,
    professionCertification,
    fPassportNumber,
    married,
    militaryService,
    pensionsEstablished,
    additionalNotes,
    bloodType,
    driversCertificate,
    driversCertificateNumber,
    disabled,
    userRole,
    isActive,
    email,
    createdAt,
  }) {
    this.userId = userId;
    this.loginName = loginName;
    this.passwordHash = passwordHash;
    this.profilePicture = profilePicture;
    this.registryNumber = registryNumber;
    this.familyTreeName = familyTreeName;
    this.fname = fname;
    this.lname = lname;
    this.birthday = birthday ? new Date(birthday) : new Date(); // Handle potential string/Date
    this.gender = gender;
    this.citizenship = citizenship;
    this.stateCity = stateCity;
    this.townDistrict = townDistrict;
    this.validAddress = validAddress;
    this.stateCityLiving = stateCityLiving;
    this.townDistrictLiving = townDistrictLiving;
    this.validAddressLiving = validAddressLiving;
    this.postalAddress = postalAddress || ''; // Default to empty string if null/undefined
    this.homePhoneNumber = homePhoneNumber || ''; // Default to empty string if null/undefined
    this.phoneNumber = phoneNumber;
    this.phoneNumberEmergency = phoneNumberEmergency;
    this.country = country;
    this.ethnicity = ethnicity;
    this.socialBackground = socialBackground;
    this.stateCityOfBirth = stateCityOfBirth;
    this.townDistrictOfBirth = townDistrictOfBirth;
    this.placeOfBirth = placeOfBirth;
    this.education = education;
    this.currentAcademicDegree = currentAcademicDegree;
    this.profession = profession || ''; // Default to empty string if null/undefined
    this.professionCertification = professionCertification || ''; // Default to empty string if null/undefined
    this.fPassportNumber = fPassportNumber || '';
    this.married = married;
    this.militaryService = militaryService;
    this.pensionsEstablished = pensionsEstablished || ''; // Default to empty string if null/undefined
    this.additionalNotes = additionalNotes || ''; // Default to empty string if null/undefined
    this.bloodType = bloodType || ''; // Default to empty string if null/undefined
    this.driversCertificate = driversCertificate;
    this.driversCertificateNumber = driversCertificateNumber;
    this.disabled = disabled;
    this.userRole = userRole;
    this.isActive = isActive ?? true; // Default to true if null/undefined
    this.email = email;
    this.createdAt = createdAt ? new Date(createdAt) : new Date(); // Handle potential string/Date
  }

  // Simulate a fromJson-like static method
  static fromJson(json) {
    try {
      return new AuthUser({
        userId: json.user_id ?? 0,
        loginName: json.login_name ?? '',
        passwordHash: json.password_hash ?? '',
        profilePicture: json.profile_picture ?? '',
        registryNumber: json.registry_number ?? '',
        familyTreeName: json.family_tree_name ?? '',
        fname: json.fname ?? '',
        lname: json.lname ?? '',
        birthday: json.birthday,
        gender: json.gender ?? '',
        citizenship: json.citizenship ?? '',
        stateCity: json.state_city ?? '',
        townDistrict: json.town_district ?? '',
        validAddress: json.valid_address ?? '',
        stateCityLiving: json.state_city_living ?? '',
        townDistrictLiving: json.town_district_living ?? '',
        validAddressLiving: json.valid_address_living ?? '',
        postalAddress: json.postal_address,
        homePhoneNumber: json.home_phone_number,
        phoneNumber: json.phone_number ?? '',
        phoneNumberEmergency: json.phone_number_emergency ?? '',
        country: json.country ?? '',
        ethnicity: json.ethnicity ?? '',
        socialBackground: json.social_background ?? '',
        stateCityOfBirth: json.state_city_of_birth ?? '',
        townDistrictOfBirth: json.town_district_of_birth ?? '',
        placeOfBirth: json.place_of_birth ?? '',
        education: json.education ?? '',
        currentAcademicDegree: json.current_academic_degree ?? '',
        profession: json.profession,
        professionCertification: json.profession_certification,
        fPassportNumber: json.f_passport_number,
        married: json.married ?? '',
        militaryService: json.military_service ?? '',
        pensionsEstablished: json.pensions_established,
        additionalNotes: json.additional_notes,
        bloodType: json.blood_type,
        driversCertificate: json.drivers_certificate ?? '',
        driversCertificateNumber: json.drivers_certificate_number ?? '',
        disabled: json.disabled ?? '',
        userRole: json.user_role ?? '',
        isActive: json.is_active,
        email: json.email ?? '',
        createdAt: json.created_at,
      });
    } catch (error) {
      console.error('Error parsing AuthUser from JSON:', error);
      return null; // Or throw the error, depending on your error handling strategy
    }
  }

  toString() {
    return `AuthUser(user_role: ${this.userRole})`;
  }
}

export default AuthUser;