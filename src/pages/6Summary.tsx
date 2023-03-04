const Summary = () => {
  return (
    <div className="u-section">
      <div className="u-container summary">
        <div className="summary-sub left">
          <h4>Summary</h4>
          <strong>Limited Impact of Food Insecurity</strong>
          <p>
            In summary, food insecurity is linked to but has limited impact on
            the Northern Triangle migration. The relationship between food
            insecurity and migration action is not strongly correlated, as
            individuals with better access to food tend to have a greater desire
            to migrate but are less likely to make concrete plans to do so.
          </p>
          <strong>Food Insecurity and Migration Plan</strong>

          <p>
            One possible explanation for this pattern is that people with fewer
            worries about their basic needs, such as food, may have more
            resources and time to consider migration possibility that could
            improve their living standards. However, even among those with
            better access to food, the likelihood of making concrete migration
            plans in the near future is not necessarily higher than those who
            are food insecure.
          </p>
          <strong> Complexity of Migration Drive</strong>
          <p>
            The issue of migration is complex and multifaceted, and requires a
            broader perspective to fully understand. Food security should not be
            viewed as the sole solution or bargaining chip to address
            immigration issues, but rather as a basic human right that every
            nation and individual should uphold and ensure.
          </p>
        </div>
        <div className="summary-sub right">
          <div className="reference">
            <h4>Reference</h4>
            <ul>
              <li>
                Abuelafia, Emmanuel, Giselle Del Carmen, Marta Ruiz-Arranz. “In
                the footprints of migrants: Perspectives and experiences of
                migrants from El Salvador, Guatemala and Honduras in the United
                States.” Inter-American Development Bank: Creative Commons,
                2019.
              </li>
              <li>
                World Food Programme, “Climate crisis and economic shocks leave
                millions food insecure across Central America”, UN News, 23
                February 2021
              </li>
              <li>
                Clemens, Michael. “The Real Root Causes of America’s Border
                Crisis And How Biden Can Address Them.” Foreign Affairs. 7 June
                2021.
              </li>
            </ul>
          </div>
          <div className="data-source">
            <h4>Data Source</h4>
            <ul>
              <li>
                <a
                  href="https://www.fao.org/faostat/en/#data/FS"
                  className="u-link">
                  Prevalence of moderate and severe food insecurity in the total
                  population by nations, 2020
                </a>
              </li>
              <li>
                <a
                  href="https://www.un.org/development/desa/pd/content/international-migrant-stock"
                  className="u-link">
                  International Migrant Stock, Population Division, United
                  Nations, 2020
                </a>
              </li>
              <li>
                Anonymized survey data from 5000+ Household Interviews conducted
                by a joint initiative between World Food Program and the
                Migration Policy Institute and the International Organization
                for Migration.
              </li>
            </ul>
          </div>
          <div className="team">
            <h4>Team</h4>

            <ul className="oneline">
              <li>Huiwen Shi</li>
              <li> Rui Wang</li>
            </ul>
            <ul className="oneline">
              <li>Ziyi Tang</li>
              <li>Yingu Pan</li>
            </ul>
            <ul>
              <li>
                MIT 11.454: Big Data, Visualization, and Society - Fall 2021
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Summary;
