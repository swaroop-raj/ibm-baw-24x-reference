/**
 * IBM BAW 24.X — Coach View Sample: Real-Time Form Validation
 */

// Email validation — On Change
var email = me.getData();
if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    me.setValid(false, "Please enter a valid email address");
} else { me.setValid(true, ""); }

// Phone auto-format — On Change
var phone = me.getData();
if (phone) {
    var cleaned = phone.replace(/\D/g, "");
    if (cleaned.length === 10) {
        me.setData("(" + cleaned.substring(0,3) + ") " + cleaned.substring(3,6) + "-" + cleaned.substring(6));
    } else if (cleaned.length > 10) { me.setValid(false, "Phone number must be 10 digits"); }
}

// Date range — Coach Data Change Script
if (tw.local.startDate && tw.local.endDate && tw.local.startDate.getTime() > tw.local.endDate.getTime()) {
    tw.system.coachValidation.addValidationError("tw.local.startDate", "Start date must be before end date.");
}
tw.local.readyToSubmit = tw.system.coachValidation.validationErrors.length === 0;
