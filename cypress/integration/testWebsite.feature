Feature: Search feature functionality

    This feature is required for a search.

    @searchFeature
    Scenario: Success Search
        Given Navigate to the website
        When I input search fields
            | eventPlace                 | caption                   | dateFrom   | dateTo     |
            | Avia Solutions Group arena | CIRQUE DU SOLEIL - CORTEO | 2022-08-28 | 2022-08-28 |
        And Click Search button
        Then I verify the number of options that are available
            | eventPlace                 | caption                   |
            | Avia Solutions Group arena | CIRQUE DU SOLEIL - CORTEO |