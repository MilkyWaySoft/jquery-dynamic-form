jquery-dynamic-form
===================

Give the ability, to form users, to dynamically add fields based on an existing template.

The template is a part of the actual displayed form. It can be a single field or several fields along with their label. jQuery Dynamic Form takes care of normalizing names and ids :

Name attributes of each duplicated fields are normalize to ease the collect of data server side. They will be sent as nested arrays.
id s attributes are indented to make them unique

Labels for attributes are updated with the right name in order to match the related field

For example, in a contact form, basically a simple phone field is set. The user can add several other phone numbers adding phone fields with a plus button.
