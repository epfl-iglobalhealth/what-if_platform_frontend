import { UnemploymentRateService } from './../../../services/unemployment-rate.service';
import { GroupFeatureSelectionComponent } from './../../components/group-feature-selection/group-feature-selection.component';
import { demographicValidator } from '../../../validators/demographic-validator.directive';
import { Constants } from './../../../model/constants.model';
import { Prediction } from './../../../model/prediction.model';
import { ReproductionRateService } from '../../../services/reproduction-rate.service';
import { CountryDataService } from './../../../services/country-data.service';
import { Feature, VariableFeatures } from './../../../model/feature.model';
import { Router, ActivatedRoute } from '@angular/router';
import {
  AfterViewInit,
  Component,
  OnInit,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { ValidatorFn } from '@angular/forms';
import { FieldValidator } from '../../../model/field-validator.model';

@Component({
  selector: 'app-features-selection',
  templateUrl: './features-selection.component.html',
  styleUrls: ['./features-selection.component.scss'],
})
export class FeaturesSelectionComponent implements OnInit, AfterViewInit {
  @ViewChildren('inputFeaturesGroup')
  featuresGroups: QueryList<GroupFeatureSelectionComponent>;

  pageNumber: number = 1;
  isPage: Array<boolean> = [true, false, false];
  dates: Array<string> = [];

  demographicValidators: FieldValidator[] = [
    {
      validator: demographicValidator,
      errors: [
        {
          name: 'sumError',
          message:
            'The sum of the population stratified by age should be equal to the total population of the country',
        },
      ],
    },
  ];

  loadingMessage: string;
  goBackLink: string;

  isoCode = '';
  startDate = '';
  endDate = '';
  countryName = '';
  type = '';

  isGroupValid: {
    demographic: boolean;
    sanitary: boolean;
    unemployment: boolean;
    gdp: boolean;
  } = { demographic: true, sanitary: true, unemployment: true, gdp: true };

  features: {
    demographic: Feature[];
    sanitary: Feature[];
    unemployment: Feature[];
    gdp: Feature[];
    policies: Feature[];
  } = {
    demographic: [
      {
        fullName: 'Total population',
        name: 'total_population_all',
        value: 40,
        range: [0, 2000000000],
        isUsed: false,
      },
      {
        fullName: 'Total population under 1 years old',
        name: 'total_population_below_1',
        value: 40,
        range: [0, 2000000000],
        isUsed: false,
      },
      {
        fullName: 'Total population between 1 and 4 years old',
        name: 'total_population_1_to_4',
        value: 40,
        range: [0, 2000000000],
        isUsed: false,
      },
      {
        fullName: 'Total population between 5 and 14 years old',
        name: 'total_population_5_to_14',
        value: 40,
        range: [0, 2000000000],
        isUsed: false,
      },
      {
        fullName: 'Total population between 15 and 24 years old',
        name: 'total_population_15_to_24',
        value: 40,
        range: [0, 2000000000],
        isUsed: false,
      },
      {
        fullName: 'Total population between 25 and 34 years old',
        name: 'total_population_25_to_34',
        value: 40,
        range: [0, 2000000000],
        isUsed: false,
      },
      {
        fullName: 'Total population between 35 and 54 years old',
        name: 'total_population_35_to_54',
        value: 40,
        range: [0, 2000000000],
        isUsed: false,
      },
      {
        fullName: 'Total population between 55 and 74 years old',
        name: 'total_population_55_to_74',
        value: 40,
        range: [0, 2000000000],
        isUsed: false,
      },
      {
        fullName: 'Total population above 75 years old',
        name: 'total_population_above_75',
        value: 40,
        range: [0, 2000000000],
        isUsed: false,
      },
      {
        fullName: 'Population percentage over 60 years old',
        name: 'population_percentage_over_60',
        value: 10,
        range: [0, 100],
        isUsed: false,
      },
    ],
    sanitary: [
      {
        fullName: 'Number of hospital beds per 1000 people',
        name: 'hospital_beds_per_1000',
        value: 10,
        range: [0, 15],
        isUsed: false,
      },
      {
        fullName: 'Number of physicians per 1000 people',
        name: 'physicians_per_1000',
        value: 10,
        range: [0, 15],
        isUsed: false,
      },
      {
        fullName: 'Number of nurses per 1000 people',
        name: 'nurses_per_1000',
        value: 10,
        range: [0, 20],
        isUsed: false,
      },
    ],
    unemployment: [
      {
        fullName: 'Unemployment rate (31/03/2019)',
        name: 'unemployment_rate_2019_03_31',
        value: 40,
        range: [0, 100],
        isUsed: false,
      },
      {
        fullName: 'Unemployment rate (30/06/2019)',
        name: 'unemployment_rate_2019_06_30',
        value: 40,
        range: [0, 100],
        isUsed: false,
      },
      {
        fullName: 'Unemployment rate (30/09/2019)',
        name: 'unemployment_rate_2019_09_30',
        value: 40,
        range: [0, 100],
        isUsed: false,
      },
      {
        fullName: 'Unemployment rate (31/12/2019)',
        name: 'unemployment_rate_2019_12_31',
        value: 40,
        range: [0, 100],
        isUsed: false,
      },
      {
        fullName: 'Unemployment rate (31/03/2020)',
        name: 'unemployment_rate_2020_03_31',
        value: 40,
        range: [0, 100],
        isUsed: false,
      },
      {
        fullName: 'Unemployment rate (30/06/2020)',
        name: 'unemployment_rate_2020_06_30',
        value: 40,
        range: [0, 100],
        isUsed: false,
      },
      {
        fullName: 'Unemployment rate (30/09/2020)',
        name: 'unemployment_rate_2020_09_30',
        value: 40,
        range: [0, 100],
        isUsed: false,
      },
      {
        fullName: 'Unemployment rate (31/12/2020)',
        name: 'unemployment_rate_2020_12_31',
        value: 40,
        range: [0, 100],
        isUsed: false,
      },
      {
        fullName: 'Unemployment rate (31/03/2021)',
        name: 'unemployment_rate_2021_03_31',
        value: 40,
        range: [0, 100],
        isUsed: false,
      },
      {
        fullName: 'Unemployment rate (30/06/2021)',
        name: 'unemployment_rate_2021_06_30',
        value: 40,
        range: [0, 100],
        isUsed: false,
      },
      {
        fullName: 'Unemployment rate (30/09/2021)',
        name: 'unemployment_rate_2021_09_30',
        value: 40,
        range: [0, 100],
        isUsed: false,
      },
      {
        fullName: 'Unemployment rate (31/12/2021 - forecast)',
        name: 'unemployment_rate_2021_12_31',
        value: 40,
        range: [0, 100],
        isUsed: false,
      },
    ],
    gdp: [
      {
        fullName: 'GDP (31/03/2019)',
        name: 'gdp_2019_03_31',
        value: 40,
        range: [0, 100000],
        isUsed: false,
      },
      {
        fullName: 'GDP (30/06/2019)',
        name: 'gdp_2019_06_30',
        value: 40,
        range: [0, 100000],
        isUsed: false,
      },
      {
        fullName: 'GDP (30/09/2019)',
        name: 'gdp_2019_09_30',
        value: 40,
        range: [0, 100000],
        isUsed: false,
      },
      {
        fullName: 'GDP (31/12/2019)',
        name: 'gdp_2019_12_31',
        value: 40,
        range: [0, 100000],
        isUsed: false,
      },
      {
        fullName: 'GDP (31/03/2020)',
        name: 'gdp_2020_03_31',
        value: 40,
        range: [0, 100000],
        isUsed: false,
      },
      {
        fullName: 'GDP (30/06/2020)',
        name: 'gdp_2020_06_30',
        value: 40,
        range: [0, 100000],
        isUsed: false,
      },
      {
        fullName: 'GDP (30/09/2020)',
        name: 'gdp_2020_09_30',
        value: 40,
        range: [0, 100000],
        isUsed: false,
      },
      {
        fullName: 'GDP (31/12/2020)',
        name: 'gdp_2020_12_31',
        value: 40,
        range: [0, 100000],
        isUsed: false,
      },
      {
        fullName: 'GDP (31/03/2021)',
        name: 'gdp_2021_03_31',
        value: 40,
        range: [0, 100000],
        isUsed: false,
      },
      {
        fullName: 'GDP (30/06/2021)',
        name: 'gdp_2021_06_30',
        value: 40,
        range: [0, 100000],
        isUsed: false,
      },
      {
        fullName: 'GDP (30/09/2021)',
        name: 'gdp_2021_09_30',
        value: 40,
        range: [0, 100000],
        isUsed: false,
      },
      {
        fullName: 'GDP (31/12/2021 - forecast)',
        name: 'gdp_2021_12_31',
        value: 40,
        range: [0, 100000],
        isUsed: false,
      },
    ],
    policies: [
      {
        fullName: 'School closing',
        name: 'school_closing',
        value: [1, 2, 3],
        range: [0, 3],
        isUsed: false,
      },
      {
        fullName: 'Workplace closing',
        name: 'workplace_closing',
        value: [1, 2, 3],
        range: [0, 3],
        isUsed: false,
      },
      {
        fullName: 'Canceling public events',
        name: 'cancel_public_events',
        value: [1, 2, 3],
        range: [0, 2],
        isUsed: false,
      },
      {
        fullName: 'Restrictions on gatherings size',
        name: 'restrictions_on_gatherings',
        value: [1, 2, 3],
        range: [0, 4],
        isUsed: false,
      },
      {
        fullName: 'Closing public transports',
        name: 'close_public_transport',
        value: [1, 2, 3],
        range: [0, 2],
        isUsed: false,
      },
      {
        fullName: 'Stay at home requirements',
        name: 'stay_at_home_requirements',
        value: [1, 2, 3],
        range: [0, 3],
        isUsed: false,
      },
      {
        fullName: 'Public information campaigns',
        name: 'public_information_campaigns',
        value: [1, 2, 3],
        range: [0, 2],
        isUsed: false,
      },
      {
        fullName: 'Restrictions on internal movement',
        name: 'restrictions_on_internal_movement',
        value: [1, 2, 3],
        range: [0, 2],
        isUsed: false,
      },
      {
        fullName: 'International travelling controls',
        name: 'international_travel_controls',
        value: [1, 2, 3],
        range: [0, 4],
        isUsed: false,
      },
    ],
  };

  features_to_drop_unemployment = [
    'unemployment_rate_2020_03_31',
    'unemployment_rate_2020_06_30',
    'unemployment_rate_2020_09_30',
    'unemployment_rate_2020_12_31',
    'unemployment_rate_2021_03_31',
    'unemployment_rate_2021_06_30',
  ];

  constructor(
    private route: ActivatedRoute,
    private countryDataService: CountryDataService,
    private reproductionRateService: ReproductionRateService,
    private unemploymentRateService: UnemploymentRateService,
    private router: Router
  ) {}

  ngAfterViewInit(): void {
    this.featuresGroups.forEach((el) => el.initGroup());
  }

  ngOnInit(): void {
    this.init();
  }

  private init() {
    this.loadingMessage = 'Fetching data...';

    // Getting params
    this.route.params.subscribe((params) => {
      this.isoCode = params['country'];

      // Getting constant features
      this.countryDataService
        .getConstantFeatures(this.isoCode)
        .subscribe((data) => {
          console.log(data);

          Object.keys(this.features).forEach((category) => {
            this.updateCategory(category, data);
          });

          // Getting parameters
          this.route.queryParams.subscribe((params) => {
            this.startDate = params['start_date'];
            this.endDate = params['end_date'];
            this.countryName = params['country_name'];
            this.type = params['type'];

            // Removing not used columns for unemployment rate model
            if (this.type == Constants.UNEMPLOYMENT_FEATURES_TYPE) {
              this.goBackLink = '/unemployment-rate';
              this.features.unemployment = this.features.unemployment.filter(
                (el) => !this.features_to_drop_unemployment.includes(el.name)
              );
            } else {
              this.goBackLink = '/reproduction-rate';
            }

            // Getting variable features
            this.countryDataService
              .getVariableFeatures(this.isoCode, this.startDate, this.endDate)
              .subscribe((data: VariableFeatures) => {
                console.log(data);

                this.dates = data.dates;

                this.updateCategory('policies', data.policies);

                // Dropping all not used features
                Object.keys(this.features).forEach((category) => {
                  this.features[category] = this.features[category].filter(
                    (el: Feature) => el.isUsed
                  );
                });

                this.loadingMessage = null;
              });
          });
        });
    });
  }

  public changeValidity(key: string, value: boolean) {
    this.isGroupValid[key] = value;
  }

  public isFormValid(): boolean {
    let isValid: boolean = true;

    Object.keys(this.isGroupValid).forEach((key) => {
      if (!this.isGroupValid[key]) {
        isValid = false;
        return;
      }
    });

    return isValid;
  }

  private updateCategory(category: string, data: Object) {
    this.features[category].forEach((feature: Feature, index: number) => {
      if (feature.name in data) {
        this.features[category][index].isUsed = true;

        this.changeSingleFeature(category, feature.name, data[feature.name]);
      }
    });
  }

  private changeSingleFeature(category: string, name: string, value: string) {
    let feature = this.features[category].find(
      (el: Feature) => el.name == name
    );
    if (feature) {
      feature['value'] = value;
    }
  }

  public onFeatureChange(
    category: string,
    value: { featureName: string; updatedValue: number }
  ) {
    this.changeSingleFeature(
      category,
      value.featureName,
      value.updatedValue.toString()
    );
  }

  public changeValue(featureCategory: string, featureName: string, event: any) {
    let value = event.target.value;
    this.changeSingleFeature(featureCategory, featureName, value);
  }

  public changePage(pageNumber: number) {
    for (let i = 0; i < this.isPage.length; i++) {
      this.isPage[i] = false;
    }

    this.isPage[pageNumber - 1] = true;
  }

  public clearStorage() {
    localStorage.removeItem(Constants.CONSTANT_FEATURES_ID + this.isoCode);

    localStorage.removeItem(
      Constants.VARIABLE_FEATURES_ID +
        this.startDate +
        this.endDate +
        this.isoCode
    );
    
    localStorage.removeItem(
      Constants.REPRODUCTION_PREDICTION_KEY +
        this.startDate +
        this.endDate +
        this.isoCode
    );

    localStorage.removeItem(
      Constants.UNEMPLOYMENT_PREDICTION_KEY + this.isoCode
    );

    setTimeout(() => {
      window.location.reload();
    }, 1000);
  }

  public predict() {
    let constantFeatures: Object = {};

    Object.keys(this.features).forEach((category) => {
      if (category != 'policies') {
        constantFeatures = {
          ...constantFeatures,
          ...this.features[category].reduce(
            (obj: string, item: Feature) =>
              Object.assign(obj, { [item.name]: item.value }),
            {}
          ),
        };
      }
    });

    let variableFeatures: Object = this.features['policies'].reduce(
      (obj, item) => Object.assign(obj, { [item.name]: item.value }),
      {}
    );

    let variableFeaturesToStore: VariableFeatures = {
      dates: this.dates,
      policies: variableFeatures,
    };

    localStorage.setItem(
      Constants.VARIABLE_FEATURES_ID +
        this.startDate +
        this.endDate +
        this.isoCode,
      JSON.stringify(variableFeaturesToStore)
    );

    localStorage.setItem(
      Constants.CONSTANT_FEATURES_ID + this.isoCode,
      JSON.stringify(constantFeatures)
    );

    let data: Prediction = {
      start_date: this.startDate,
      end_date: this.endDate,
      features: {
        constant: constantFeatures,
        variable: variableFeatures,
      },
    };

    console.log(data);

    if (this.type == Constants.REPRODUCTION_FEATURES_TYPE) {
      this.reproductionRateService
        .getPredictions(this.isoCode, data)
        .subscribe((result) => {
          console.log(result);
          localStorage.setItem(
            Constants.REPRODUCTION_PREDICTION_KEY +
              this.startDate +
              this.endDate +
              this.isoCode,
            JSON.stringify(result)
          );
          this.router.navigate(['/reproduction-rate']);
        });
    } else {
      this.unemploymentRateService
        .getPredictions(this.isoCode, data)
        .subscribe((result) => {
          console.log(result);
          localStorage.setItem(
            Constants.UNEMPLOYMENT_PREDICTION_KEY + this.isoCode,
            JSON.stringify(result)
          );
          this.router.navigate(['/unemployment-rate']);
        });
    }

    this.loadingMessage = 'Making predictions...';
  }
}
